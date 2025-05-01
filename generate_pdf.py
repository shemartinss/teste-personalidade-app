#!/usr/bin/env python3
import sys
from weasyprint import HTML, CSS
from weasyprint.fonts import FontConfiguration
import argparse

# Basic interpretations (replace with more nuanced text later)
def get_interpretation(domain, score):
    # Score range: 24-120
    if score < 60:
        level = "baixo"
    elif score < 84:
        level = "médio"
    else:
        level = "alto"

    interpretations = {
        "N": {
            "baixo": "Você tende a ser calmo, resiliente e seguro. Lida bem com o estresse e raramente se sente ansioso ou inseguro.",
            "médio": "Você tem um equilíbrio emocional, experienciando emoções negativas ocasionalmente, mas geralmente mantendo a compostura.",
            "alto": "Você tende a ser mais sensível ao estresse e pode experienciar emoções como ansiedade, preocupação ou tristeza com mais frequência."
        },
        "E": {
            "baixo": "Você tende a ser mais reservado, quieto e independente. Prefere ambientes calmos e pode se sentir esgotado por muita interação social.",
            "médio": "Você aprecia tanto momentos de interação social quanto períodos de tranquilidade, equilibrando extroversão e introversão.",
            "alto": "Você tende a ser sociável, falante, assertivo e energizado pela companhia de outras pessoas. Busca ativamente interações sociais."
        },
        "O": {
            "baixo": "Você tende a ser mais prático, convencional e prefere o familiar. Pode ser mais cauteloso em relação a mudanças e novas ideias.",
            "médio": "Você tem uma mente aberta para novas ideias, mas também valoriza a tradição e o pragmatismo.",
            "alto": "Você tende a ser curioso, imaginativo, criativo e aberto a novas experiências e ideias não convencionais."
        },
        "A": {
            "baixo": "Você tende a ser mais cético, assertivo e competitivo. Pode priorizar seus próprios interesses e ser mais direto na comunicação.",
            "médio": "Você é geralmente cooperativo e atencioso, mas também sabe defender seus próprios interesses quando necessário.",
            "alto": "Você tende a ser compassivo, cooperativo, confiante e atencioso com os outros. Valoriza a harmonia nos relacionamentos."
        },
        "C": {
            "baixo": "Você tende a ser mais espontâneo, flexível e descontraído. Pode preferir improvisar a seguir planos rígidos.",
            "médio": "Você é geralmente organizado e responsável, mas também permite flexibilidade e espontaneidade em sua rotina.",
            "alto": "Você tende a ser organizado, responsável, disciplinado e focado em objetivos. É persistente e gosta de planejamento."
        }
    }
    return interpretations.get(domain, {}).get(level, "Interpretação não disponível.")

def generate_pdf(html_content, output_path, name, scores):
    font_config = FontConfiguration()

    # Replace placeholders
    html_content = html_content.replace("{{ NOME_DO_USUARIO }}", name)
    html_content = html_content.replace("{{ ANO_ATUAL }}", str(datetime.date.today().year))

    for domain in ["N", "E", "O", "A", "C"]:
        score = scores.get(domain, 0)
        interpretation = get_interpretation(domain, score)
        html_content = html_content.replace(f"{{{{ SCORE_{domain} }}}}", str(score))
        html_content = html_content.replace(f"{{{{ INTERPRETACAO_{domain} }}}}", interpretation)

    html = HTML(string=html_content, base_url=".") # base_url might be needed if HTML references local files
    html.write_pdf(output_path, font_config=font_config)
    print(f"PDF generated successfully at {output_path}")

if __name__ == "__main__":
    # We need datetime for the year placeholder
    import datetime

    parser = argparse.ArgumentParser(description=\"Generate Big Five PDF report.\")
    parser.add_argument("--template", required=True, help=\"Path to the HTML template file.\")
    parser.add_argument("--output", required=True, help=\"Path to save the generated PDF file.\")
    parser.add_argument("--name", required=True, help=\"Name of the user.\")
    parser.add_argument("--score_n", required=True, type=int, help=\"Neuroticism score.\")
    parser.add_argument("--score_e", required=True, type=int, help=\"Extraversion score.\")
    parser.add_argument("--score_o", required=True, type=int, help=\"Openness score.\")
    parser.add_argument("--score_a", required=True, type=int, help=\"Agreeableness score.\")
    parser.add_argument("--score_c", required=True, type=int, help=\"Conscientiousness score.\")

    args = parser.parse_args()

    scores = {
        "N": args.score_n,
        "E": args.score_e,
        "O": args.score_o,
        "A": args.score_a,
        "C": args.score_c
    }

    try:
        with open(args.template, "r", encoding="utf-8") as f:
            template_content = f.read()
        generate_pdf(template_content, args.output, args.name, scores)
    except FileNotFoundError:
        print(f"Error: Template file not found at {args.template}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error generating PDF: {e}", file=sys.stderr)
        sys.exit(1)

