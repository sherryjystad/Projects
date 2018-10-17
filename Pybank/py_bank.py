# This script is used to analyzing the financial records of my company, Sherry Inc. 
# The tasks for this script is the print to terminal
# Gitbash the results of the analysis and an output file.
# The Python script analyzes Sherry Inc., records for the following:
# The total number of months included in the dataset.
# The total net amout of Profit/Losses over the entire period.
# The average change in Profit/Losses between months over the entire period.
# The greatest increase in profits(date and amount) over the entire period. 
# The greatest decrease in losses(date and amount) over the entire period.

import os
import csv

MMYYYY_date = []
net_amount = []
new_list = []

# Path to collect data from the Resources folder
budget_data_path = os.path.join('..', 'Resources', 'budget_data.csv')

with open(budget_data_path, newline='', encoding='UTF-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    csv_header = next(csv_reader) 

# Collect data from reader and place in list
    for row in csv_reader:
        MMYYYY_date.append(row[0])
        net_amount.append(int(row[1]))

# Analyzing data
total_months = len(net_amount)
total_net_amount = round(sum(net_amount),0)
average_change = round((total_net_amount/total_months)*100,2)

start_year_profit = net_amount[0]
end_year_profit = net_amount[total_months-1]
average_profit_change = round((end_year_profit-start_year_profit)/total_months,2)

# Zip all two lists together into one list
new_list = list(zip(MMYYYY_date, net_amount))
profit_increase = max(new_list)
profit_decrease = min(new_list)

# Convert to string to show results on terminal and Write to a file
total_months = str(total_months)
total_net_amount = str(total_net_amount)
average_profit_change = str(average_profit_change)

# Print Financial Analysis Report to terminal
title = "Financial Analysis"
dashes = "-----------------------"
# Results to Terminal
print(title)
print(dashes)
print("Total Months:" + " " + total_months)
print("Total:" + "   $" + total_net_amount)
print("Average Change:" + "   $" + average_profit_change)
print("Greatest Increase in Profits:    " + str(profit_increase))
print("Greatest Decrease in Profits:    " + str(profit_decrease))

# Specify the file to write to
output_path = os.path.join("..", "output", "bank_data.csv")

# Open the file using "write" mode. Specify the variable to hold the contents
with open(output_path, 'w', newline='') as csvfile:

    # Initialize csv.writer
    csvwriter = csv.writer(csvfile, delimiter=',')
    csvwriter.writerow(['Financial Analysis'])
    csvwriter.writerow(['-------------------------------'])
    csvwriter.writerow(['Total Months:  ', total_months])
    csvwriter.writerow(['Total:         ', total_net_amount])
    csvwriter.writerow(['Average Change:',average_profit_change])
    csvwriter.writerow(['Greatest Increase in Profits:',profit_increase])
    csvwriter.writerow(['Greatest Decrease in Profits:',profit_decrease])
    