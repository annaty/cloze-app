import { Lang } from '../../routes/api/langs.ts';
import { LOCAL_API } from "../constants/client_constants.ts";

export const getLanguageSelection = (): Promise<{ [type: string]: Lang }> =>
	fetch(`${LOCAL_API}langs`)
		.then(res => res.json());

export const updateLanguageSelection = (body: Lang): Promise<Lang> =>
	fetch(`${LOCAL_API}update_lang`, {
		method: 'POST',
		body: JSON.stringify(body)
	})
		.then(res => {
			return res.json()
		});
