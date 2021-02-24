import { Model } from './Model';


export default class Api extends Model {
	protected _type = Api;
	public success:boolean;
	public data:any;
	public code?:string;
	public message?:string;
	public datetime:string;

	protected _schema = {
		table: 'Api',
		fields: [{
			name: 'success',
		}, {
			name: 'data',
			type: 'json',
			default: {}
		}, {
			name: 'code',
		}, {
			name: 'message',
		}, {
			name: 'datetime',
		}]
	}
}