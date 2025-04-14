// this is a NODE.JS file

import axios from 'axios';
import cmsData from './cms.json' assert { type: 'json' };
import fs from 'fs/promises';

const API_KEY = ' Put your API Key here'
const CHANNEL_ID = ' Put your channel id here '

const WEBHOOK_URL = 'https://discord.com/api/webhooks/ Put your webhook here ';

let milestones = [
    10, 20, 30, 40, 50, 60, 70, 80, 90,

    100, 1000, 
    10000, 20000, 30000, 40000, 50000,
    60000, 70000, 80000, 90000, 
    
    100000, 200000, 300000, 400000, 500000, 
    600000, 700000, 800000, 900000,
    
    1000000, 2000000, 3000000, 4000000, 5000000,
    6000000, 7000000, 8000000, 9000000
]

async function getSubscriberCount() {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'statistics',
                id: CHANNEL_ID,
                key: API_KEY,
            },
        });

        // Check if the response has the correct data and parse the subscriber count as an integer
        const subscriberCount = response.data.items[0].statistics.subscriberCount;
        if (subscriberCount !== undefined) {
            return parseInt(subscriberCount, 10); // Convert the string to an integer
        } else {
            console.error('Error: Subscriber count not available');
            return null;
        }
    } catch (error) {
        console.error(`Error Fetching Subscriber Count:`, error);
        return null;
    }
}

async function gsc() {
    return getSubscriberCount()
}

function remove_completed_milestones() {
    const completedSubs = cmsData.compeleted_milestones.map(milestone => milestone.subs);
    milestones = milestones.filter(sub => !completedSubs.includes(sub)); // ✅ Removes completed milestones properly
}

async function milestone_callback(subs, milestone, date) {
    const payload = {
        content: null,
        embeds: [
            {
                title: "SUBSCRIBER MILESTONE!",
                description: `The Gamyies Youtube Channel has just reached ${milestone} subscribers!`,
                color: 16732754,
                timestamp: date
            }
        ]
    }

    axios.post(WEBHOOK_URL, payload)
        .then(response => {
            console.log('Webhook message sent:', response.status)
        })
        .catch(error => {
            console.error('Error sending webhook message:', error)
        })
}

async function milestone_check() {
    const subCount = await gsc();
    remove_completed_milestones();
    if (subCount >= milestones[0]) {
        const now = new Date();
        const YYYY = now.getUTCFullYear();
        const MM = String(now.getUTCMonth() + 1).padStart(2, '0');
        const DD = String(now.getUTCDate()).padStart(2, '0');
        const hh = String(now.getUTCHours()).padStart(2, '0');
        const mm = String(now.getUTCMinutes()).padStart(2, '0');
        const ss = String(now.getUTCSeconds()).padStart(2, '0');

        cmsData.compeleted_milestones.push({"subs": milestones[0], "when": `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss} UTC+0`});

        await milestone_callback(subCount, milestones[0], `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.000Z`);

        try {
            await fs.writeFile('cms.json', JSON.stringify(cmsData, null, 2)); // ✅ FIXED: Use fs.writeFile instead of fs.writeFileSync
            console.log(`✅ Milestone ${milestones[0]} saved to cms.json`);
        } catch (error) {
            console.error('❌ Error writing to cms.json:', error);
        }

        console.log('MILESTONE REACHED!')
    }

    console.log(subCount, milestones[0])
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const infiniteLoop = async () => {
    let counter = 0;
    while (true) {
        await milestone_check();
        await delay(10000);
        counter++;
    }
}

infiniteLoop()