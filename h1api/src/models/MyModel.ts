import { Model } from './Model';


export default class MyModel extends Model {
	protected _type = MyModel;
	public property1:boolean;
	public property2:any;
	public property3?:string;
	public property4?:string;
	public property5:string;

	protected _schema = {
		table: 'MyModel',
		fields: [{
			name: 'property1',
		}, {
			name: 'property2',
			type: 'json',
			default: { value1: true}
		}, {
			name: 'property3',
		}, {
			name: 'property4',
		}, {
			name: 'property5',
		}]
	}
}