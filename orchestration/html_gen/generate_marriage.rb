require 'csv'
require 'date'

# run this file in the terminal using the "ruby" command

csv_file = File.read('/Users/benanandappa/family_tree_repos/family-history/orchestration/data/marriage_records.csv')
csv_data = CSV.parse(csv_file, headers: true)

list_delimiter = ';'

csv_data.each do |row|
  # Define variables for the post data
  partner_1_first = row['partner_1_first']
  if partner_1_first.nil?
    next
  end

  if row["relevent_trees"]
    rel_trees = row["relevent_trees"].split(list_delimiter).map(&:strip)
  else
    rel_trees = []
  end

  if row["relevent_trees_2"]
    rel_trees_2 = row["relevent_trees_2"].split(list_delimiter).map(&:strip)
  else
    rel_trees_2 = []
  end

  rel_trees = rel_trees + rel_trees_2


  partner_1_last = row['partner_1_last']
  partner_1_full = partner_1_first + " " + partner_1_last
  
  partner_1_father_first = row['partner_1_father_first']
  partner_1_father_last = row['partner_1_father_last']

  partner_2_first = row['partner_2_first']
  partner_2_last = row['partner_2_last']
  partner_2_full = partner_2_first + " " + partner_2_last

  partner_2_father_first = row['partner_2_father_first']
  partner_2_father_last = row['partner_2_father_last']
  
  date = Date.strptime(row['date'], '%m/%d/%Y').strftime('%Y-%m-%d')
  image_file = row['file']

  title = "Marriage of " + partner_1_full + " and " + partner_2_full
  
  # Define the Jekyll post file name based on the date and title
  post_name = "#{title.downcase.gsub(' ', '-')}.md"
  
  # Create the Jekyll post file and populate it with the data
  File.open("/Users/benanandappa/family_tree_repos//family-history/docs/_marriage/#{post_name}", "w") do |file|
    file.write("---\n")
    file.write("layout: marriage\n")
    file.write("title: #{title}\n")

    file.write("partner_1_first: #{partner_1_first}\n")
    file.write("partner_1_last: #{partner_1_last}\n")
    file.write("partner_1_father_first: #{partner_1_father_first}\n")
    file.write("partner_1_father_last: #{partner_1_father_last}\n")

    file.write("partner_2_first: #{partner_2_first}\n")
    file.write("partner_2_last: #{partner_2_last}\n")
    file.write("partner_2_father_first: #{partner_2_father_first}\n")
    file.write("partner_2_father_last: #{partner_2_father_last}\n")

    file.write("image_file: #{image_file}\n")

    file.write("rel_trees:\n")
    rel_trees.each_with_index do |rel_tree, index|
      file.write(" - #{rel_tree}\n")
    end

    unless date.nil?
      file.write("date: #{date}\n")
    end
    file.write("categories: marriage\n")
    file.write("---\n\n")
    file.write()
  end
end 

