#!/usr/bin/env bash

user="admin"
password="admin123"
database="offline_import_test"
#add command to import source
mysql -u"$user" -p"$password" "$database" <<EOF
SOURCE  ;
SELECT *    FROM court_details;
EOF