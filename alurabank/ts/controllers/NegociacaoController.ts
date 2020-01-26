import { NegociacoesView, MensagemView } from "../views/index";
import { Negociacoes, Negociacao, NegociacaoParcial } from "../models/index";
import { domInject, throttle } from "../helpers/decorators/index";
import { NegociacaoService, HandlerFunction } from "../service/index";

export class NegociacaoController {
	@domInject("#data")
	private _inputData: JQuery;
	@domInject("#quantidade")
	private _inputQuantidade: JQuery;
	@domInject("#valor")
	private _inputValor: JQuery;
	private _negociacoes = new Negociacoes();
	private _negociacoesView = new NegociacoesView("#negociacoesView", true);
	private _mensagemView = new MensagemView("#mensagemView");
	private _service = new NegociacaoService();

	constructor() {
		this._negociacoesView.update(this._negociacoes);
	}

	@throttle(1000)
	adiciona() {
		let data = new Date(this._inputData.val().replace(/-/g, ","));
		if (!this._ehDiaUtil(data)) {
			this._mensagemView.update(
				"Adicione somente negociações em dias úteis, por favor"
			);
			return;
		}
		const negociacao = new Negociacao(
			data,
			parseInt(this._inputQuantidade.val()),
			parseFloat(this._inputValor.val())
		);
		this._negociacoes.adiciona(negociacao);

		this._negociacoesView.update(this._negociacoes);
		this._mensagemView.update("Negociação adicionada com sucesso");
	}

	private _ehDiaUtil(data: Date) {
		return (
			data.getDay() != DiaDaSemana.Domingo &&
			data.getDay() != DiaDaSemana.Sabado
		);
	}

	@throttle(1000)
	importarDados() {
		const isOk: HandlerFunction = (res: Response) => {
			if (res.ok) {
				return res;
			} else {
				throw new Error(res.statusText);
			}
		};

		this._service.obterNegociacoes(isOk).then(negociacoes => {
			negociacoes.forEach((negociacao: Negociacao) =>
				this._negociacoes.adiciona(negociacao)
			);
			this._negociacoesView.update(this._negociacoes);
		});
	}
}

enum DiaDaSemana {
	Domingo,
	Segunda,
	Terca,
	Quarta,
	Quinta,
	Sexta,
	Sabado
}
