#!/bin/bash

dir=$(dirname "${BASH_SOURCE[0]}");

for file in $(find $dir/params -name '*.json'); do
    envName=$(echo $file | xargs basename | sed 's/\.json//g')
    params=$(cat $file)

    config=$(cat $dir/config.json | jq --argjson params "$params" '.Parameters=$params')
    echo $config > bdc-online.${envName}.config.json
done

cp $dir/config.json dns.config.json