#!/bin/bash

FILENAME="notes/report.txt"

echo "User: $(whoami)" > $FILENAME
echo "Directory: $(pwd)" >> $FILENAME
echo "Files: $(ls data | wc -l)" >> $FILENAME

echo "Script executed."
