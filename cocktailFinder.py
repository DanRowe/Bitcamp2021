import json
import datetime
my_date = datetime.date.today()
year, week_num, day_of_week = my_date.isocalendar()
with open('cocktail.json') as f:
  data = json.load(f)
print("Try a "+ data["data"][week_num]["name"] + " with "+data["data"][week_num]["detail"])