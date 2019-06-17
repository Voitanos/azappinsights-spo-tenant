# Voitanos Azure Application Insights for SPO

A SharePoint Framework app customizer that adds Azure App Insights to all pages in an SPO tenant. It is automatically deployed across to the entire tenant & installed.

## Config

The Azure AppInsights instance is pinned to  **8e937756-a28b-4b74-8bcd-a19c0e8b8a45**.

A `namePrefix` set to **voitanos-global** is used to make sure other AppInsights instances on the page won't conflict with this one or vice versa.

## Version history

| Version |     Date      |                     Comments                     |
| ------- | ------------- | ------------------------------------------------ |
| 2.0.1   | June 17, 2019 | Added `namePrefix` to scope AppInsights instance |
| 2.0.0   | June 10, 2019 | Published                                        |
