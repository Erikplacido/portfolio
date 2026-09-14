import { EdgeCase } from '../types';

export const fintechEdgeCases: EdgeCase[] = [
  {
    id: 'nfc_chip_failure',
    title: '1. Falha na Leitura NFC / Chip Danificado',
    category: 'hardware',
    triggerLabel: 'Falha no NFC/Chip',
    errorTitle: 'Não conseguimos ler seu cartão',
    microcopy:
      'Parece que houve uma oscilação na aproximação ou a antena do cartão não respondeu. Não se preocupe: você pode digitar os 4 dígitos impressos no verso ou tentar aproximar novamente segurando firme no topo do aparelho.',
    technicalReason:
      'Timeout de handshake ISO/IEC 14443 Type A ou pacote APDU corrompido durante a leitura da antena RFID/NFC.',
    primaryAction: 'Digitar código manualmente',
    secondaryAction: 'Tentar aproximação de novo',
    severity: 'warning',
  },
  {
    id: 'cpf_divergence',
    title: '2. Divergência de CPF do Titular',
    category: 'identity',
    triggerLabel: 'Divergência de CPF',
    errorTitle: 'Dados do cartão não conferem com seu cadastro',
    microcopy:
      'Este cartão físico está vinculado a outro documento ou lote corporativo. Se você trocou de empresa recentemente ou recebeu cartões múltiplos no mesmo endereço, verifique o nome impresso no verso do plástico.',
    technicalReason:
      'Discrepância criptográfica entre o Hash do CPF autenticado na sessão JWT e o Cardholder ID retornado pelo BaaS (Pismo/Dock).',
    primaryAction: 'Verificar meus dados cadastrais',
    secondaryAction: 'Chamar suporte Caju',
    severity: 'error',
  },
  {
    id: 'expired_activation_code',
    title: '3. Código de Ativação Expirado (> 30 dias)',
    category: 'lifecycle',
    triggerLabel: 'Código Expirado',
    errorTitle: 'O prazo de ativação deste cartão expirou',
    microcopy:
      'Por motivos de segurança regulatória, envelopes emitidos há mais de 30 dias têm seus códigos provisórios suspensos. Mas fique tranquilo: seu saldo de benefícios está intacto e podemos emitir uma 2ª via sem nenhum custo para você.',
    technicalReason:
      'TTL de token de ativação (30 dias) expirado na tabela de provisionamento pré-emissão antes do primeiro evento de unbound-to-bound.',
    primaryAction: 'Pedir 2ª via gratuita',
    secondaryAction: 'Entenda os prazos de segurança',
    severity: 'warning',
  },
  {
    id: 'fraud_prevention_lock',
    title: '4. Bloqueio Preventivo por Suspeita de Extravio',
    category: 'fraud',
    triggerLabel: 'Suspeita de Extravio',
    errorTitle: 'Bloqueio preventivo ativado temporariamente',
    microcopy:
      'Identificamos uma tentativa de ativação fora do padrão de segurança da sua conta (como localização ou dispositivo divergente). Para proteger seu saldo, pausamos o processo. Uma notificação com verificação facial rápida foi enviada ao seu e-mail cadastrado.',
    technicalReason:
      'Gatilho de motor antifraude (Device Fingerprint + GeoIP score de anomalia acima do threshold PCI-DSS Tier 1).',
    primaryAction: 'Fazer validação facial rápida',
    secondaryAction: 'Falar com o time de segurança',
    severity: 'critical',
  },
  {
    id: 'pin_attempts_exceeded',
    title: '5. Limite de Tentativas de Senha Excedido',
    category: 'security',
    triggerLabel: 'Tentativas Excedidas',
    errorTitle: 'Limite de tentativas atingido por segurança',
    microcopy:
      'Você tentou cadastrar ou validar combinações inválidas várias vezes seguidas. Para resguardar sua senha contra tentativas automatizadas, bloqueamos novas tentativas por 15 minutos. Você pode aguardar ou redefinir a identidade agora.',
    technicalReason:
      'Rate-limiting de segurança disparado no backend (máximo de 5 tentativas inválidas de PIN por janela de 10 minutos).',
    primaryAction: 'Aguardar 15 minutos',
    secondaryAction: 'Confirmar identidade por biometria',
    severity: 'warning',
  },
];
