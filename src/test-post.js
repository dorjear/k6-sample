import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 3,
    duration: '5s'
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

export function setup() {
    const res = http.post('https://httpbin.test.k6.io/post', payload, { headers });
    const response = JSON.parse(res.body);
    console.log(response.json);
    return response.json.name;
}

export default function (dataFromSetup) {
    // put the name into the firstName field fo the payload
    console.log("The name from setup is " + dataFromSetup);

    const payload2 = JSON.stringify({
        name: 'xxx' + dataFromSetup,
        surname: 'ipsum',
    });
    console.log("The name after massage is " + payload2);
    http.post('https://httpbin.test.k6.io/post', payload2, { headers });
    // delay 1 second
    sleep(1);
}
