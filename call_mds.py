import json
import csv
import requests
import collections

def main():
    output_path = "outputs"
    output_file = "mds_results.json"
    mds_results = query_mds()
    mds_studies_list,mds_covid_list = transform_mds_dict(mds_results)

    # Export Files to JSON
    with open(f"{output_path}/studies_{output_file}", "w") as stream:
        json.dump(mds_studies_list,indent=2,fp=stream)

    with open(f"{output_path}/covid_{output_file}", "w") as stream:
        json.dump(mds_covid_list,indent=2,fp=stream)


def query_mds():

    # Request Details (hardcoded for now)
    headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
        }
    base_url = "https://gen3.biodatacatalyst.nhlbi.nih.gov/mds"
    endpoint = "metadata"  
    guid_type = "discovery_metadata"
    return_data = "true"
    limit = 2000

    request_url = f"{base_url}/{endpoint}?_guid_type={guid_type}&limit={limit}&data={return_data}"
    
    # Request Object:
    req = requests.request(method = "GET",
                        url = request_url,
                        headers = headers)
        
    # What happens when we fail
    if req.status_code is not 200:
        print("Issue with API call. Contact Gen3")

    results_obj = req.json()
        
    return(results_obj)

def transform_mds_dict(mds_result):
    # Initialize lists
    mds_studies_list = []
    mds_covid_list = []
    

    # Iterate over each item
    for k,v in mds_result.items():

        # Initialize covid and dict
        new_dict = {}
        covid = False

        # Get main metadata
        metadata = v['gen3_discovery']

        # COVID Check
        for elem in metadata['tags']:
            if 'COVID 19' in elem.values():
                covid = True # set covid true

        # Strip Consent
        full_accession = metadata['dbgap_accession']
        accession = full_accession[:full_accession.find('.c')]

        # Write Values
        new_dict["Acession"] = accession
        new_dict["Cohort Abbreviation"] = metadata['short_name']
        new_dict["Name"] = metadata['full_name']
        new_dict["Description"] = metadata['study_description']
        new_dict["Consent Code"] = metadata['dbgap_consent']
        new_dict["Consent Short"] = metadata['dbgap_consent_text']
        new_dict["Subject Count"] = metadata['_subjects_count']

        if covid:
            mds_covid_list.append(new_dict)
        else:
            mds_studies_list.append(new_dict)

    return(mds_studies_list,mds_covid_list)

if __name__ == "__main__":
    main()