import {NexelliaWallet as BaseNexelliaWallet} from '/node_modules/@nexellia/ux/nexellia-ux.js';

class NexelliaWallet extends BaseNexelliaWallet{
	makeFaucetRequest(subject, args){
		let origin = 'https://faucet.nexell-ai.com';
		//origin = 'http://localhost:3000';
		const {address, amount} = args;
		let path = {
			'faucet-available': `available/${address}`,
			'faucet-request': `get/${address}/${amount}`
		}[subject];

		if(!path)
			return Promise.reject("Invalid request subject:"+subject)

		return fetch(`${origin}/api/${path}`, {
			method: 'GET'
		}).then(res => res.json())
	}
}

NexelliaWallet.define("nexellia-wallet")
