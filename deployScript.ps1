npm install
npm run build --prod
Compress-Archive -Path C:\Users\Vishal\Documents\GitHub\Seller-ONDC-Angular\dist\ondc-form\* -DestinationPath C:\Users\Vishal\Documents\GitHub\Seller-ONDC-Angular\dist\ondc-form\Ondc-form
az webapp deployment source config-zip --resource-group jiw-ozed-rg-staging --name jiw-ozed-as-staging --src C:\Users\Vishal\Documents\GitHub\Seller-ONDC-Angular\dist\ondc-form\Ondc-form.zip
Read-Host "Press enter to exit"