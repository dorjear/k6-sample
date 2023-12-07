import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export default function () {
    http.get('http://google.com');
}

export const options = {
    vus: 3,
    duration: '5s'
};

export function handleSummary(data) {
    return {
        "summary-get.html": htmlReport(data),
    };
}
