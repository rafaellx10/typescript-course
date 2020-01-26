import { Negociacao } from "./Negociacao";
import { logarTempoDeExecucao } from "../helpers/decorators/index";

export class Negociacoes {
	// private _negociacoes: Negociacao[] = [];
	private _negociacoes: Array<Negociacao> = [];

	adiciona(negociacao: Negociacao): void {
		this._negociacoes.push(negociacao);
	}

	@logarTempoDeExecucao()
	paraArray(): Negociacao[] {
		return ([] as Negociacao[]).concat(this._negociacoes);
	}

	paraTexto(): void {
		console.log("Impressão");
		console.log(JSON.stringify(this._negociacoes));
	}
}
