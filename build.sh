start=`date +%s`
npm run prettify

npm run build;
rm -rf webapp_traciex.tgz;
tar -zcvf webapp_traciex.tgz build;

end=`date +%s`
runtime=$((end-start))
echo "$runtime"
