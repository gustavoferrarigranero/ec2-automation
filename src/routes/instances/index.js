import {h, Component} from 'preact';
import awsSdk from 'aws-sdk';
import style from './style.css';

export default class Instances extends Component {
    handleStop () {
        awsSdk.config.update({
            region: 'us-east-1',
            secretAccessKey: process.env.PREACT_APP_AWS_ACCESS_KEY_ID, // TODO buscar de algum lugar
            accessKeyId: process.env.PREACT_APP_AWS_SECRET_ACCESS_KEY, // TODO buscar de algum lugar
        });

        const ec2 = new awsSdk.EC2({apiVersion: '2016-11-15'}); // TODO buscar de algum lugar

        const params = {
            InstanceIds: [process.env.PREACT_APP_INSTANCE_ID],
            DryRun: true
        };

        ec2.stopInstances(params, function(err, data) {
            if (err && err.code === 'DryRunOperation') {
                params.DryRun = false;
                ec2.stopInstances(params, function(err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else if (data) {
                        console.log("Success", data.StoppingInstances);
                    }
                });
            } else {
                console.log("You don't have permission to stop instances");
            }
        });
    }

    handleStart() {
        awsSdk.config.update({
            region: 'us-east-1',
            secretAccessKey: process.env.PREACT_APP_AWS_ACCESS_KEY_ID, // TODO buscar de algum lugar
            accessKeyId: process.env.PREACT_APP_AWS_SECRET_ACCESS_KEY, // TODO buscar de algum lugar
        });

        const ec2 = new awsSdk.EC2({apiVersion: '2016-11-15'}); // TODO buscar de algum lugar

        const params = {
            InstanceIds: [process.env.PREACT_APP_INSTANCE_ID],
            DryRun: true
        };

        ec2.startInstances(params, function(err, data) {
            if (err && err.code === 'DryRunOperation') {
                params.DryRun = false;
                ec2.startInstances(params, function(err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else if (data) {
                        console.log("Success", data.StartingInstances);
                    }
                });
            } else {
                console.log("You don't have permission to start instances.");
            }
        });
    }

    // Note: `user` comes from the URL, courtesy of our router
    render(props) {
        return (
            <div class={style.instances}>
                <button onClick={() => this.handleStop()}>Stopar instancia</button>
                <br/>
                <br/>
                <br/>
                <button onClick={() => this.handleStart()}>Iniciar instancia</button>
            </div>
        );
    }
}
