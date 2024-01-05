# Employee management api

## Code Structure

![code-structure.png](images%2Fcode-structure.png)

#### Dependencies

![dependencies.png](images%2Fdependencies.png)

#### Index.js

![index.png](images%2Findex.png)

#### Routes

![routes.png](images%2Froutes.png)

#### Models

![models.png](images%2Fmodels.png)

#### Controllers

![controllers.png](images%2Fcontrollers.png)

#### Mongodb.js

![mongodb.png](images%2Fmongodb.png)

#### Dockerfile
We are running Docker as non root user

![Dockerfile.png](images%2FDockerfile.png)

#### Swagger.yaml

![swagger.png](images%2Fswagger.png)

#### Tests
We are using Mocha, mocha-prepare and mongo-unit for IT Tests
![tests.png](images%2Ftests.png)


## Deploy the Applications

## Deployment using Docker-compose

- For local deployment using docker compose, check this file: https://github.com/devsahamerlin/terraform-private-gke-mongodb-atlas/blob/main/LOCAL-DEPLOYMENT.md

## This below is Only for GCP CI Deployment using Artifact Registry

![GitHub Actions CI](images/GitHub-Action-To-Artifact-Registry.png)


### Fork This Repo on your GitHub Account

### GitHub Actions Pipeline
- Feature Pipeline

![feature-pipeline.png](images%2Ffeature-pipeline.png)

- Pull Request Pipeline

![pull-request-pipeline.png](images%2Fpull-request-pipeline.png)

- Main Pipeline

![main-pipeline.png](images%2Fmain-pipeline.png)

### Setup GCP and GitHub Actions

#### You can use our Youtube Video demo here:
#### Or follow manual step bellow

1. You must have GCP Project and Known your PROJECT_ID
2. Fork this repository on your own git account
3. Go to GCP `IAM & Admin`-> `Service Account`, then click on `github-actions-ar-sa@<PROJECT_ID>.iam.gserviceaccount.com` if you are using the IaC Terraform code provided or Create a service account `github-actions-ar-sa@<PROJECT_ID>.iam.gserviceaccount.com` with the following Rules: `roles/artifactregistry.writer`
4. Generate Key:
    - Click on the service account, in the Tab menu, click on `KEYS`, click on `ADD KEYS`, click on `Create New Key` and choose `JSON`, then click on `CREATE`

    * Select Service Account
   
      ![IAM & Admin](images/IAM-Admin.png)

    * Click on `Create New Key`
   
      ![Create Keys](images/Create-Keys.png)

    * Click on `CREATE`
   
      ![Generate Keys](images/generate-Keys.png)


5. Add the content of your GCP Credentials file on GitHub Actions secret

- Google Cloud Recommend to Use `Workload Identity Provider` with GitHub Actions, you can get details here and how to use it https://cloud.google.com/blog/products/identity-security/enabling-keyless-authentication-from-github-actions. We added both options in GitHub Actions workflows, if you are using The Terraform provided code for your Infrastructure, then you can use it, by uncommenting `workload_identity_provider` step in `.github/worklows/main.yml line 37 to 42` and comment `line 32 to 35`

- On your project repository click on Settings -> Secrets & variables -> New Repository Secret and paste the Json content of your credentials file. give name as `GOOGLE_APPLICATION_CREDENTIALS` and click on Add secret

  ![Add GCP Credentials on GitHub Actions](images/Add-gcp-credentials-on-GitHub.png)

* Key content

  ![GCP Credentials on GitHub Actions](images/GitHub-GCP-Credentials.png)

- Repeat to add these Secrets to GitHub Actions:
```sh
    GCP_PROJECT_ID # your gcp project id
    GCP_PROJECT_NUMBER # (Optional)  If you choose to use Workload Identity Provider, your can you gcp project number directly on the GCP Welcom page when you select projet, is like this 123456789
```

- All Secrets Result

  ![GitHub Actions All Secrets](images/All-secrets-on-GitHub-Actions.png)

6. Make change on a feature branch, then create a Pull Request and Merge to `main` branch to start the pipeline. or directly push new change on `main` branch

7. If you follow all steps correctly, your image will be push on GCP Artifact Registry


## If you want to run the application

### Install dependenies
```sh
npm i
```

### Run test
```sh
npm run test
```

### Run the application
```sh
npm run dev
```