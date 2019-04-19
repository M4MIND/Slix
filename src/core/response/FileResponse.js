import Response from "./Response"

export default class FileResponse extends Response {
	constructor(content, contentType) {
		super(content);
		this.headers.setContentType(contentType);
		return this;
	}
}