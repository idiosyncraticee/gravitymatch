#USE conda env python36
# source activate python36
# pip install grpcio --no-cache-dir


import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
import pandas as pd
from random import randint
import urllib.request
import requests
import json

facesui_url = 'https://uifaces.co/api?limit=1&random'
#TODO: GET A REAL API KEY, THIS ONE IS 'BORROWED'
faces_uiheaders = {'content-type': 'application/json', 'X-API-KEY': '73188088aadd0280d27c736ca4beaa'}

# Use a service account
cred = credentials.Certificate('datingfirebase-firebase-adminsdk-04jrb-3d501507d2.json')

firebase_admin.initialize_app(cred)

max_int = 2147483647; # max 32-bit signed int

#############
## THESE ARE THE MAPPINGS BETWEEN THE DATA AND THE STRING VALUE
#############

race_dict =	{
   1 : "Black / African American",
   2 : "European / Caucasian - American",
   3 : "Latino / Hispanic American",
   4 : "Asian / Pacific Islander / Asian - American",
   5 : "Native American",
   6 : "Other",
}

gender_dict = {
   0 : "Female",
   1 : "Male",
}

uifaces_gender_dict = {
   0: "female",
   1: "male",
}

goal_dict = {
   1: "Seemed like a fun night out",
   2: "To meet new people",
   3: "To get a date",
   4: "Looking for a serious relationship",
   5: "To say I did it",
   6: "Other",
}

field_dict = {
1: "Law",
2: "Math",
3: "Social Science, Psychologist",
4: "Medical Science, Pharmaceuticals, and Bio Tech",
5: "Engineering",
6: "English/Creative Writing/ Journalism",
7: "History/Religion/Philosophy",
8: "Business/Econ/Finance",
9: "Education, Academia",
10: "Biological Sciences/Chemistry/Physics",
11: "Social Work",
12: "Undergrad/undecided",
13: "Political Science/International Affairs",
14: "Film",
15: "Fine Arts/Arts Administration",
16: "Languages",
17: "Architecture",
18: "Other",

}
dating_df = pd.read_csv("Speed_Dating_Data.csv", encoding="ISO-8859-1")

db = firestore.client()

hash_alg = auth.UserImportHash.hmac_sha256(key=b'cheddar')

latest_iid = -1
for index,row in dating_df.iterrows():

   #######
   ### CREATE THE USER FOR FIREBASE AUTH
   #######
   username = u'user'+str(row['iid'])

   if row['iid']!=latest_iid:
      try:
         users = [
            auth.ImportUserRecord(
               uid=username,
               email=username+'@gm.com',
               password_hash=b'password_hash_1',
               password_salt=b'salt1'
            ),
         ]
         result = auth.import_users(users, hash_alg=hash_alg)
         print('Successfully imported {0} users. Failed to import {1} users.'.format(
            result.success_count, result.failure_count))
         for err in result.errors:
            print('Failed to import {0} due to {1}'.format(users[err.index].uid, err.reason))

         latest_iid = row['iid']
      except auth.AuthError:
         # Some unrecoverable error occurred that prevented the operation from running.
         pass
      #GET AN AVATAR FROM uifaces
      try:
         #ONLY HIT THE API ONCE PER USER
         gender = uifaces_gender_dict[int(row['gender'])]



         from_age = str(int(row['age'] - 1))
         to_age = str(int(row['age'] + 1))
         if(int(row['race'])!=2):
            #payload = {'gender[]': gender, 'from_age': from_age, 'to_age': to_age, 'hairColor[]': 'black'}
            facesui_url_full = facesui_url + '&gender[]=' + gender + '&from_age=' + from_age + '&to_age=' + to_age + '&hairColor[]=black'
         else:
            hair_color = 'blond'
            #payload = {'gender[]': gender, 'from_age': from_age, 'to_age': to_age, 'hairColor[]': 'blond'}
            facesui_url_full = facesui_url + '&gender[]=' + gender + '&from_age=' + from_age + '&to_age=' + to_age
         #r = requests.get(facesui_url, params=json.dumps(payload), headers=faces_uiheaders)
         print(facesui_url_full)
         r = requests.get(facesui_url_full, headers=faces_uiheaders)

         print(json.dumps(payload))
         print(r.request)
      except:
         pass

      print(row['iid'])


      #######
      ### ADD THE USER DATA TO THE FIRESTORE
      #######
      print(row['field'])
      doc_ref = db.collection(u'users').document(username)
      doc_ref.set({
         u'race': race_dict[int(row['race'])],
         u'mn_sat': row['mn_sat'],
         u'gender': gender_dict[int(row['gender'])],
         u'age': row['age'],
         u'goal': goal_dict[int(row['goal'])],
         u'field': field_dict[int(row['field_cd'])],
         u'random': randint(0, max_int),
         u'avatar': r.json()[0]['photo'],
         u'matches': [],
         u'realuser': 0,
      })

   #######
   ### ADD IN THE MATCH RESULT TO THE FIRESTORE
   #######

   doc_ref = db.collection(u'matches').document(username+u'_'+u'user'+str(int(row['pid'])))
   doc_ref.set({
      u'rid': u'user'+str(int(row['pid'])),
      u'cid': username,
      u'match': row['match'],
   })


   #ABORT FOR PERFORMANCE
   if row['wave']>1:
      print("Breaking wave")
      break

dating_df.head()
