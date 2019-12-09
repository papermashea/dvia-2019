#!/usr/bin/env python
# encoding: utf-8
"""
filter-hospitals.py

Created by Christian Swinehart on 2019/11/26.
Copyright (c) 2019 Samizdat Drafting Co. All rights reserved.
"""

import os
from csv import DictReader, DictWriter
_root = os.path.dirname(os.path.abspath(__file__))

def main():
  # read in the whole huge csv
  reader = DictReader(open('data/HospitalLocationsLg.csv'))
  headers = reader.fieldnames

  # create a new csv file to which we'll add any rows from the original that make the cut
  with open('data/HospitalLocationsGeneral.csv', 'w') as f:
    writer = DictWriter(f, fieldnames=headers)
    writer.writeheader()

    # step through each of the rows from the original
    for row in reader:

      # test whether the value for the column of interest is the one we're looking for
      # and if so, write that row to the new csv file. otherwise, just skip it
      if row['NAICS_DESC'] == 'GENERAL MEDICAL AND SURGICAL HOSPITALS':
        writer.writerow(row)

    print 'wrote matching rows to', f.name

if __name__ == "__main__":
  os.chdir(_root)
  main()
