import { Negociacao } from "./Negociacao";
import { logarTempoDeExecucao } from "../helpers/decorators/index";
import { Imprimivel } from "./imprimivel";

export class Negociacoes extends Imprimivel {
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
