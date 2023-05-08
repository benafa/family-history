require 'csv'

# run this file in the terminal using the "ruby" command

csv_file = File.read('/Users/benanandappa/Documents/git_repos/family-history/orchestration/data/marriage_records.csv')
csv_data = CSV.parse(csv_file, headers: true)

csv_data.each do |row|
  # Define variables for the post data
  partner_1_first = row['partner_1_first']
  if partner_1_first.nil?
    next
  end
  partner_1_last = row['partner_1_last']
  partner_1_full = partner_1_first + " " + partner_1_last
  
  partner_1_father_first = row['partner_1_father_first']
  partner_1_father_last = row['partner_1_father_last']

  partner_2_first = row['partner_2_first']
  partner_2_last = row['partner_2_last']
  partner_2_full = partner_2_first + " " + partner_2_last

  partner_2_father_first = row['partner_2_father_first']
  partner_2_father_last = row['partner_2_father_last']
  
  date = row['date']
  image_file = row['file']

  title = "Marriage of " + partner_1_full + " and " + partner_2_full
  
  # Define the Jekyll post file name based on the date and title
  post_name = "#{title.downcase.gsub(' ', '-')}.md"
  
  # Create the Jekyll post file and populate it with the data
  File.open("/Users/benanandappa/Documents/git_repos/family-history/docs/_marriage/#{post_name}", "w") do |file|
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

    unless date.nil?
      file.write("date: #{date}\n")
    end
    file.write("categories: marriage\n")
    file.write("---\n\n")
    file.write()
  end
end 

