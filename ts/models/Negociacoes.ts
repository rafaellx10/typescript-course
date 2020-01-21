class Negociacoes {
	// private _negociacoes: Negociacao[] = [];
	private _negociacoes: Array<Negociacao> = [];

	adiciona(negociacao: Negociacao): void {
		this._negociacoes.push(negociacao);
	}

	paraArray(): Negociacoes[] {
		return [].concat(this._negociacoes);
	}
}
