terraform {
  required_version = ">=1.4.6"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.2.0"
    }
  }

  backend "gcs" {}
}

# Configure OCP infrastructure to setup the host and authentication token
provider "kubernetes" {
  host  = var.kubernetes_host
  token = var.kubernetes_token
}

# Configure GCP infrastructure to setup the credentials, default project and location (zone and/or region) for your resources
provider "google" {
  project = var.project_id
  region  = local.region
  credentials = "/Users/jolarouc/Repositories/cas-cif/.scratch/credentials.json"
}

# Create GCS buckets
resource "google_storage_bucket" "bucket" {
  for_each = { for v in var.apps : v => v }
  name     = "${var.openshift_namespace}-${each.value}"
  location = local.region
}

# Create GCP service accounts for each GCS bucket
resource "google_service_account" "account" {
  for_each     = { for v in var.apps : v => v }
  account_id   = "sa-${var.openshift_namespace}-${each.value}"
  display_name = "${var.openshift_namespace}-${each.value} Service Account"
  depends_on   = [google_storage_bucket.bucket]
}

# Assign Storage Admin role for the corresponding service accounts
resource "google_storage_bucket_iam_member" "admin" {
  for_each   = { for v in var.apps : v => v }
  bucket     = "${var.openshift_namespace}-${each.value}"
  role       = "roles/storage.admin"
  member     = "serviceAccount:${google_service_account.account[each.key].email}"
  depends_on = [google_service_account.account]
}

# Create viewer GCP service accounts for each GCS bucket
resource "google_service_account" "viewer_account" {
  for_each     = { for v in var.apps : v => v }
  account_id   = "ro-${var.openshift_namespace}-${each.value}"
  display_name = "${var.openshift_namespace}-${each.value} Viewer Service Account"
  depends_on   = [google_storage_bucket.bucket]
}

# Assign (manually created) Storage Viewer role for the corresponding service accounts
resource "google_storage_bucket_iam_member" "viewer" {
  for_each   = { for v in var.apps : v => v }
  bucket     = "${var.openshift_namespace}-${each.value}"
  role       = "projects/${var.project_id}/roles/${var.iam_storage_role_template_id}"
  member     = "serviceAccount:${google_service_account.viewer_account[each.key].email}"
  depends_on = [google_service_account.viewer_account]
}

# Create keys for the service accounts
resource "google_service_account_key" "key" {
  for_each           = { for v in var.apps : v => v }
  service_account_id = google_service_account.account[each.key].name
}

# Create keys for the viewer service accounts
resource "google_service_account_key" "viewer_key" {
  for_each           = { for v in var.apps : v => v }
  service_account_id = google_service_account.viewer_account[each.key].name
}

resource "kubernetes_secret" "secret_sa" {
  for_each = { for v in var.apps : v => v }
  metadata {
    name      = "gcp-${var.openshift_namespace}-${each.value}-service-account-key"
    namespace = var.openshift_namespace
    labels = {
      created-by = "Terraform"
    }
  }

  data = {
    "bucket_name"             = "${var.openshift_namespace}-${each.value}"
    "credentials.json"        = base64decode(google_service_account_key.key[each.key].private_key)
    "viewer_credentials.json" = base64decode(google_service_account_key.viewer_key[each.key].private_key)
  }
}
