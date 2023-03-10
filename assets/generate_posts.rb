require 'csv'

csv_file = File.read('posts.csv')
csv_data = CSV.parse(csv_file, headers: true)

csv_data.each do |row|
  # Define variables for the post data
  title = row['title']
  date = row['date']
  author = row['author']
  category = row['category']
  content = row['content']
  
  # Define the Jekyll post file name based on the date and title
  post_name = "#{date}-#{title.downcase.gsub(' ', '-')}.md"
  
  # Create the Jekyll post file and populate it with the data
  File.open("_posts/#{post_name}", "w") do |file|
    file.write("---\n")
    file.write("layout: post\n")
    file.write("title: #{title}\n")
    file.write("author: #{author}\n")
    file.write("categories: #{category}\n")
    file.write("date: #{date}\n")
    file.write("---\n\n")
    file.write("#{content}")
  end
end