import pandas as pd
import matplotlib.pyplot as plt

# Load Dataset
df = pd.read_csv("../datasets/netflix.csv")

# Basic Information
print("========== First 5 Rows ==========")
print(df.head())

print("\n========== Shape ==========")
print(df.shape)

print("\n========== Columns ==========")
print(df.columns)

print("\n========== Dataset Info ==========")
print(df.info())

print("\n========== Statistical Summary ==========")
print(df.describe())

print("\n========== Missing Values ==========")
print(df.isnull().sum())

print("\n========== Duplicate Rows ==========")
print(df.duplicated().sum())

# Movies and TV Shows
movies = df[df["type"] == "Movie"]
tvshows = df[df["type"] == "TV Show"]

print("\nTotal Movies:", movies.shape[0])
print("Total TV Shows:", tvshows.shape[0])

# Release Year Count
print("\n========== Top 10 Release Years ==========")
print(df["release_year"].value_counts().head(10))

# Rating Count
print("\n========== Ratings ==========")
print(df["rating"].value_counts())

# ---------------- GRAPH 1 ----------------

type_count = df["type"].value_counts()

plt.figure(figsize=(6,4))
type_count.plot(kind="bar", color=["blue","orange"])

plt.title("Movies vs TV Shows")
plt.xlabel("Content Type")
plt.ylabel("Count")

plt.tight_layout()

plt.savefig("../images/projects/netflix_type.png")

plt.show()

# ---------------- GRAPH 2 ----------------

year_count = df["release_year"].value_counts().sort_index()

plt.figure(figsize=(10,5))
year_count.plot(color="green")

plt.title("Netflix Content Released Over Years")
plt.xlabel("Year")
plt.ylabel("Number of Titles")

plt.tight_layout()

plt.savefig("../images/projects/netflix_year.png")

plt.show()

# ---------------- GRAPH 3 ----------------

country_count = df["country"].value_counts().head(10)

print("\n========== Top 10 Countries ==========")
print(country_count)

plt.figure(figsize=(10,5))
country_count.plot(kind="bar")

plt.title("Top 10 Countries on Netflix")
plt.xlabel("Country")
plt.ylabel("Number of Titles")

plt.xticks(rotation=45)

plt.tight_layout()

plt.savefig("../images/projects/top10_countries.png")

plt.show()

# ---------------- GRAPH 4 ----------------

genre_count = df["listed_in"].value_counts().head(10)

print("\n========== Top 10 Genres ==========")
print(genre_count)

plt.figure(figsize=(12,6))
genre_count.plot(kind="bar", color="purple")

plt.title("Top 10 Genres on Netflix")
plt.xlabel("Genre")
plt.ylabel("Count")

plt.xticks(rotation=45)

plt.tight_layout()

plt.savefig("../images/projects/top10_genres.png")

plt.show()

print("\n🎉 Netflix Data Analysis Project Completed Successfully!")