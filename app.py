import csv
import pandas as pd
from selenium import webdriver
import pymongo
from flask import Flask

print('imported everything')

# The default port used by MongoDB is 27017
# https://docs.mongodb.com/manual/reference/default-mongodb-port/
print('tryng to connect')
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)


# client = pymongo.MongoClient('127.0.1.1', 49247)
print('connected')
db=client.gunViolenceSummary
db.massShootings_1980.drop()
collection = db.gunviolence

filename = "data_1980_1.csv"
data=pd.read_csv(filename)
df = pd.DataFrame(data)
records = df.to_dict(orient="records")
for datum in records:
    print(datum) 
    db.collection.insert_one(datum)
    print('inserted')

df_out = list(db.collection.find())
print(df_out)
