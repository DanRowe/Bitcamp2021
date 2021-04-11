import requests
import json

#Put drink name here
drinkName = "Gin+&+Tonic"
response = requests.get(f'https://www.thecocktaildb.com/api/json/v1/1/search.php?s={drinkName}')
drinkObject = response.json()
drink = drinkObject["drinks"][0]
ingInfo = []
for ingredient in range(15):
    ingKey = f'strIngredient{str(ingredient+1)}'
    measureKey = f'strMeasure{str(ingredient+1)}'
    if drink[ingKey] and drink[measureKey]:
        ingInfo.append({
            "ingredient": drink[ingKey],
            "measurement": drink[measureKey]
        })
returnedDrink ={
    "Name": drink["strDrink"],
    "Instructions": drink["strInstructions"],
    "Category": drink["strCategory"],
    "Ingredients": ingInfo
}
print(returnedDrink)



# class drinkAPI():
#     def __init__(self, drinkName):
#         super().__init__()
#         self.drinkInfo = {}

#     def requestData(self, drinkName):
#         response = requests.get(f'https://www.thecocktaildb.com/api/json/v1/1/search.php?s={drinkName}')
#         drinkObject = response.json()
#         return drinkObject

#     def parseDrinkInformation(self)


