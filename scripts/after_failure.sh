#!/usr/bin/env bash
set -e # halt script on error

echo Failure.
curl https://maker.ifttt.com/trigger/build_failure/with/key/$IFTTT_KEY