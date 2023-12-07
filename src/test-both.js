import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export let options = {
    scenarios: {
        scenario1: {
            executor: 'constant-vus',
            vus: 10,
            duration: '10s',
            exec: 'testGet' // Name of the function to execute
        },
        scenario2: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '10s', target: 20 }
            ],
            exec: 'testPost' // Name of the function to execute
        }
    }
};

const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
});
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'http://localhost:8081'
};

export function handleSummary(data) {
    return {
        "summary-post.html": htmlReport(data),
    };
}

export function testGet() {
    http.get('http://google.com');
}

export function testPost() {
    // put the name into the firstName field fo the payload

    const payload = JSON.stringify({
        name: 'xxx',
        surname: 'ipsum',
    });
    console.log("The name after massage is " + payload);
    http.post('https://httpbin.test.k6.io/post', payload, { headers });
    // delay 1 second
    sleep(1);
}

