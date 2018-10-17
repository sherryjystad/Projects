# Sherry Inc., has been hired by a small, rural town to update their vote-counting process using this Python script. 
# This script is used to analyze the voteas and calculates each of the following:
# The total number of votes cast
# A complete list of candidates who received votes.
# The percentage of votes each candidate won.
# The total number of votes each candidate won.
# The winner of the election based on popular vote. 
# The results are printed on the terminal and an output file. 

# declare variables
import os
import csv
from collections import Counter

candidates = []
candidate_votes = []

# Path to collect data from the Resources folder
election_data_path = os.path.join('..', 'Resources', 'election_data.csv')

with open(election_data_path, newline='', encoding='UTF-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    csv_header = next(csv_reader) 

# Collect data from reader and place in list
    for row in csv_reader:
        candidates.append(row[2])

# Calculating, Print Election Report for each candidate
total_votes = len(candidates)

title = "Election Results"
dashes = "-----------------------"
print(title)
print(dashes)
print("Total Votes:" + " " + str(total_votes))
print(dashes)

# Count each candidates vote
information = Counter(candidates)

for candidate_name,vote_count in information.items():
    percent_votes = (vote_count/total_votes)*100
    percent_votes = round(percent_votes,3)
    print(candidate_name + ": " + str(percent_votes) + "%" + "(" + str(vote_count) + ")")
print(dashes)

# Print the Winner of the election
election_winner = max(information, key=information.get)
print("Winner:    " + election_winner) 
print(dashes)

# Write to output file poll_output
poll_output = os.path.join("..", "output", "poll_data.txt")
with open(poll_output, 'w') as textline:
    print("Election Results",file = textline)
    print(dashes,file = textline)
    print("Total Votes " + str(total_votes),file = textline)
    print(dashes,file = textline)


    for candidate_name,vote_count in information.items():
        name = candidate_name
        count = vote_count
        percent_votes = (vote_count/total_votes)*100
        percent_votes = round(percent_votes,3)
        print(name + ": " + str(percent_votes) + "%" + "(" + str(count) + ")",file=textline)

    print(dashes,file=textline)
    print("Winner:    " + election_winner,file=textline) 
    print(dashes,file=textline)

