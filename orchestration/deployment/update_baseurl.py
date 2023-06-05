# update_baseurl.py
import sys
import yaml

def update_baseurl(config_file, new_baseurl, new_url):
    with open(config_file, 'r') as f:
        config_data = yaml.load(f, Loader=yaml.FullLoader)

    config_data['baseurl'] = new_baseurl
    config_data['url'] = new_url
    config_data['environment'] = "prod"

    with open(config_file, 'w') as f:
        yaml.dump(config_data, f)

if __name__ == "__main__":
    config_file = sys.argv[1]
    new_baseurl = sys.argv[2]
    new_url = sys.argv[3]
    update_baseurl(config_file, new_baseurl, new_url)