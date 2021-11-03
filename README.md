# PANTOhealth-Final-Test

## Prerequisites
You need to have these installed:
- [Node js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition) (Can use [Docker](https://www.mongodb.com/compatibility/docker))
- [InfluxDB](https://docs.influxdata.com/influxdb/v2.0/install/?t=Windows) (Can use [Docker](https://docs.influxdata.com/influxdb/v2.0/install/?t=Docker#configure-influxdb-with-docker))

### Linux lm-sensors
`lm-sensors` package is needed for Linux systems to measure the CPU temperature. Install it using the following command (on DEBIAN-based systems):
```
$ sudo apt-get install lm-sensors
```


### InfluxDB additional setup
1. **Run InfluxDB:** Navigate to the install directory and run `influxd` command. Or you can use [Docker](https://docs.influxdata.com/influxdb/v2.0/install/?t=Docker#configure-influxdb-with-docker)

2. **User Setup:** Follow [these steps](https://docs.influxdata.com/influxdb/v2.0/install/#set-up-influxdb)  and save organization and bucket for use in step 6.

3. **Organization:** If you have done step 2, you have already created an organization. If you want to create a new organization for the InfluxDB, you may follow [these steps](https://docs.influxdata.com/influxdb/v2.0/organizations/create-org/). and save it for use in step 6.

4. **Bucket:** If you have done step 2, you have already created a bucket. If you want to create a new bucket for the InfluxDB, you may follow [these steps](https://docs.influxdata.com/influxdb/v2.0/organizations/buckets/create-bucket/).  and save it for use in step 6.

5. **Token:** [Create a token](https://docs.influxdata.com/influxdb/v2.0/security/tokens/create-token/) and save it for use in step 6.

6. **Environment Variables:** You need to ***set*** the InfluxDB organization, bucket and token in the [.env](./.env) file located in the root directory of this project. For example:
    ```
    ...
    INFLUX_ORG=YOUR_ORGANIZATION
    INFLUX_BUCKET=YOUR_BUCKET
    INFLUX_TOKEN=YOUR_TOKEN
    ...
    ```
    > Don't forget to remove previous values and replace them with your own.


## Run
You need to run the app in an elevated environment in order to measure CPU temperature.
* In Windows run Command Prompt as an [administrator](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/jj717276(v=ws.11)).
* In Linux use `sudo`
> You might not get the real temperature due to CPU incompatibility or other [known issues](https://systeminformation.io/issues.html).

then run the following commands in the project root directory:
```
npm install
npm start
```

## APIs
- **POST** [/cputemps](http://localhost:5000/cputemps)
    > Creates a CPU temperature point and saves it in InfluxDB.
    Request Body: { temperature: VALUE }

    For Example:
    ```
    curl -X POST -d 'temperature=93' http://localhost:5000/cputemps
    ```
- **GET** [/cputemps/average](http://localhost:5000/cputemps/average)
    > Gets the last 5-minute CPU temperature average stored in MongoDB

- **GET** [/cputemps/test](http://localhost:5000/cputemps/test)
    > Gets current CPU temperature. (for test)
