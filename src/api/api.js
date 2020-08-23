import axios from 'axios';

const ENABLE_MOCK = false;
const BASE = 'http://ec2-3-22-20-210.us-east-2.compute.amazonaws.com/';

const getMock = (response) => new Promise((resolve, reject) => {
  setTimeout(() => resolve({ data: response }), 300);
});

const get = (endpoint = "", headers = {}) =>
  axios.get(`${BASE}${endpoint}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      ...headers,
    },
  });


const withMock = (endpoints, mockEndpoints) =>
  ENABLE_MOCK
    ? Object.keys(endpoints).reduce(
        (mappedMockEndpoints, key) => ({
          ...mappedMockEndpoints,
          [key]: mockEndpoints[`${key}Mock`],
        }),
        {}
      )
    : endpoints;

const getPlayerRecords = (playerName = '') => get(`winrates/${playerName}`);
const getPlayerRecordsMock = (playerName = '') => getMock({"dashorde": [{"player": "Dashorde", "games": "2", "wins": 1, "losses": 1, "winrate": "50.00"}, {"player": "urqt314gf", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Lets Go Gank Bot", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "grandb369", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "rambo779", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "H1FakerBaker", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "RezWez", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "boops2", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "lethal03", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "1M0NSTER1", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "B1G D1CK DRAVEN", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "MasterMelhem", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Devinu", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "dfadf", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Toltorn", "games": "1", "wins": 0, "losses": 1, "winrate": "0.00"}, {"player": "Kushina ", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "Andrew135", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "natsuba", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}, {"player": "XiaoMing2018", "games": "1", "wins": 1, "losses": 0, "winrate": "100.00"}]});

const loadLatestGames = (playerName = '', riotApiKey = '') => get(`load/${playerName}`, { 'X-RIOT-API-KEY': riotApiKey });
const loadLatestGamesMock = (playerName = '', riotApiKey = '') => getMock('loading');

const checkHealth = () => get('health');
const checkHealthMock = () => getMock('ok');

export const api = withMock({
  getPlayerRecords,
  loadLatestGames,
  checkHealth
}, {
  getPlayerRecordsMock,
  loadLatestGamesMock,
  checkHealthMock
});
