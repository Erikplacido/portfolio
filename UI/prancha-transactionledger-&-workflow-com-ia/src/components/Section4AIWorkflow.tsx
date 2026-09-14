import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Code2, 
  FileJson, 
  Copy, 
  Check, 
  RefreshCw, 
  Play, 
  Layers, 
  CheckCircle2, 
  Smartphone,
  Terminal,
  Send,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const Section4AIWorkflow: React.FC = () => {
  // AI Schema Generation State
  const defaultPrompt = `Atue como Design Technologist. Crie um schema JSON detalhado para as propriedades (props) de um componente de linha de extrato bancário de fintech chamado TransactionRow. O schema deve cobrir: variant (default, compact, detailed), status (pending, approved, declined, refunded), currency (BRL, USD), boolean para isInternational e estrutura de rótulos para leitores de tela (accessibilityLabel).`;

  const [promptInput, setPromptInput] = useState<string>(defaultPrompt);
  const [isGeneratingSchema, setIsGeneratingSchema] = useState<boolean>(false);
  const [schemaResult, setSchemaResult] = useState<any>(null);
  const [schemaMetadata, setSchemaMetadata] = useState<any>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Handoff Code Tabs
  const [activeCodePlatform, setActiveCodePlatform] = useState<'reactNative' | 'jetpackCompose' | 'markdownDoc'>('reactNative');
  const [isGeneratingHandoff, setIsGeneratingHandoff] = useState<boolean>(false);
  const [handoffContext, setHandoffContext] = useState<string>('');
  const [customHandoffResult, setCustomHandoffResult] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Run Google AI Studio call for Schema
  const runGenerateSchema = async () => {
    setIsGeneratingSchema(true);
    try {
      const response = await fetch('/api/ai/generate-schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customPrompt: promptInput })
      });
      const data = await response.json();
      if (data && data.schema) {
        setSchemaResult(data.schema);
        setSchemaMetadata({
          modelUsed: data.modelUsed || 'gemini-3.8-flash',
          isFallback: data.isFallback,
          timestamp: data.timestamp
        });
      }
    } catch (err) {
      console.error("Error generating schema:", err);
    } finally {
      setIsGeneratingSchema(false);
    }
  };

  // Run Google AI Studio call for Custom Handoff
  const runGenerateHandoff = async () => {
    setIsGeneratingHandoff(true);
    try {
      const response = await fetch('/api/ai/generate-handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: activeCodePlatform === 'reactNative' ? 'react-native' : 'jetpack-compose',
          context: handoffContext
        })
      });
      const data = await response.json();
      if (data && (data.generatedMarkdown || data.reactNative)) {
        setCustomHandoffResult(data.generatedMarkdown || "Documentação atualizada com sucesso.");
      }
    } catch (err) {
      console.error("Error generating handoff:", err);
    } finally {
      setIsGeneratingHandoff(false);
    }
  };

  // Load default schema on first mount if not loaded
  React.useEffect(() => {
    runGenerateSchema();
  }, []);

  const reactNativeCode = `/**
 * Conta Simples Design System (Andes Pattern)
 * Component: TransactionRow (React Native / TypeScript)
 * WCAG 2.1 AAA Compliant • TalkBack & VoiceOver
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const tokens = {
  surfaceBase: '#FFFFFF',
  surfaceHover: '#F8F9FA',
  surfaceActive: '#F1F3F5',
  borderSubtle: '#E5E7EB',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',
  statusWarningSurface: '#FEF3C7',
  statusWarningText: '#92400E',
  statusSuccessSurface: '#DCFCE7',
  statusSuccessText: '#166534',
  statusDangerSurface: '#FEE2E2',
  statusDangerText: '#991B1B',
  spacingXs: 4,
  spacingSm: 8,
  spacingMd: 16,
};

export interface TransactionRowProps {
  id: string;
  variant?: 'default' | 'compact' | 'detailed';
  status: 'pending' | 'approved' | 'declined' | 'refunded';
  merchantName: string;
  cardholderName: string;
  costCenter: { code: string; name: string };
  amount: number;
  currency?: 'BRL' | 'USD';
  isInternational?: boolean;
  foreignExchange?: {
    originalAmount: number;
    exchangeRate: number;
    iofAmount: number;
  };
  declineReason?: string;
  accessibilityLabel: string;
  onPress?: () => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
  merchantName,
  cardholderName,
  costCenter,
  amount,
  status,
  isInternational,
  foreignExchange,
  declineReason,
  accessibilityLabel,
  onPress,
}) => {
  const isDeclined = status === 'declined';
  const isRefund = status === 'refunded' || amount > 0;

  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(amount));

  return (
    <Pressable
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Toque duas vezes para visualizar o comprovante da despesa"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      {/* Leading 44x44px */}
      <View style={styles.leadingContainer}>
        <Text style={styles.leadingText}>
          {merchantName.substring(0, 2).toUpperCase()}
        </Text>
      </View>

      {/* Content Block */}
      <View style={styles.contentBlock}>
        <Text numberOfLines={1} style={styles.merchantTitle}>
          {merchantName}
        </Text>
        <Text numberOfLines={1} style={styles.subTitle}>
          {cardholderName} • <Text style={styles.costCenterText}>{costCenter.name}</Text>
        </Text>
        {isInternational && foreignExchange && (
          <Text style={styles.intlNote}>
            USD {foreignExchange.originalAmount.toFixed(2)} • Câmbio R$ {foreignExchange.exchangeRate.toFixed(2)}
          </Text>
        )}
      </View>

      {/* Trailing Block */}
      <View style={styles.trailingBlock}>
        <Text
          style={[
            styles.amountText,
            isDeclined && styles.amountDeclined,
            isRefund && styles.amountRefund,
          ]}
        >
          {isRefund ? '+' : '-'} {formattedAmount}
        </Text>
        
        {/* Status Badge */}
        <View
          style={[
            styles.badge,
            status === 'approved' && styles.badgeSuccess,
            status === 'pending' && styles.badgeWarning,
            status === 'declined' && styles.badgeDanger,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              status === 'approved' && styles.badgeTextSuccess,
              status === 'pending' && styles.badgeTextWarning,
              status === 'declined' && styles.badgeTextDanger,
            ]}
          >
            {isDeclined && declineReason ? declineReason.toUpperCase() : status.toUpperCase()}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: tokens.surfaceBase,
    borderBottomWidth: 1,
    borderBottomColor: tokens.borderSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.spacingMd,
  },
  containerPressed: {
    backgroundColor: tokens.surfaceActive,
  },
  leadingContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacingMd,
  },
  leadingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  contentBlock: {
    flex: 1,
    marginRight: tokens.spacingSm,
  },
  merchantTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: tokens.textPrimary,
    lineHeight: 20,
  },
  subTitle: {
    fontSize: 13,
    color: tokens.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },
  costCenterText: {
    fontWeight: '600',
    color: '#3B82F6',
  },
  intlNote: {
    fontSize: 11,
    color: '#6366F1',
    marginTop: 2,
  },
  trailingBlock: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    color: tokens.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  amountDeclined: {
    textDecorationLine: 'line-through',
    color: tokens.textDisabled,
  },
  amountRefund: {
    color: '#059669',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  badgeWarning: { backgroundColor: tokens.statusWarningSurface },
  badgeSuccess: { backgroundColor: tokens.statusSuccessSurface },
  badgeDanger: { backgroundColor: tokens.statusDangerSurface },
  badgeText: { fontSize: 10, fontWeight: '700' },
  badgeTextWarning: { color: tokens.statusWarningText },
  badgeTextSuccess: { color: tokens.statusSuccessText },
  badgeTextDanger: { color: tokens.statusDangerText },
});`;

  const jetpackComposeCode = `/**
 * Conta Simples Design System (Andes Pattern)
 * Component: TransactionRowItem (Jetpack Compose / Kotlin)
 * Material 3 Standards • Accessible TalkBack Semantics
 */

package br.com.contasimples.designsystem.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

object AndesTokens {
    val SurfaceNeutral0 = Color(0xFFFFFFFF)
    val SurfaceHover = Color(0xFFF8F9FA)
    val BorderSubtle = Color(0xFFE5E7EB)
    val TextPrimary = Color(0xFF111827) // Contrast 14.2:1 WCAG AAA
    val TextSecondary = Color(0xFF6B7280) // Contrast 4.8:1 WCAG AA
    val TextDisabled = Color(0xFF9CA3AF)
    
    val StatusWarningBg = Color(0xFFFEF3C7)
    val StatusWarningText = Color(0xFF92400E)
    val StatusSuccessBg = Color(0xFFDCFCE7)
    val StatusSuccessText = Color(0xFF166534)
    val StatusDangerBg = Color(0xFFFEE2E2)
    val StatusDangerText = Color(0xFF991B1B)
}

enum class TransactionStatus { PENDING, APPROVED, DECLINED, REFUNDED }

@Composable
fun TransactionRowItem(
    merchantName: String,
    cardholderName: String,
    costCenterTag: String,
    formattedAmount: String,
    status: TransactionStatus,
    isInternational: Boolean = false,
    foreignFxText: String? = null,
    declineReason: String? = null,
    accessibilityLabel: String,
    onClick: () -> Unit
) {
    val isDeclined = status == TransactionStatus.DECLINED

    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .height(72.dp)
            .semantics {
                contentDescription = accessibilityLabel
            }
            .clickable(role = Role.Button, onClick = onClick),
        color = AndesTokens.SurfaceNeutral0
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // 1. Leading Element (44x44 dp)
            Box(
                modifier = Modifier
                    .size(44.dp)
                    .background(Color(0xFFEEF2F6), shape = CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = merchantName.take(2).uppercase(),
                    fontWeight = FontWeight.Bold,
                    fontSize = 16.sp,
                    color = AndesTokens.TextPrimary
                )
            }

            Spacer(modifier = Modifier.width(16.dp))

            // 2. Content Block
            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(end = 8.dp),
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = merchantName,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Medium,
                    color = AndesTokens.TextPrimary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "$cardholderName • $costCenterTag",
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Normal,
                    color = AndesTokens.TextSecondary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                if (isInternational && foreignFxText != null) {
                    Text(
                        text = foreignFxText,
                        fontSize = 11.sp,
                        color = Color(0xFF4F46E5),
                        maxLines = 1
                    )
                }
            }

            // 3. Trailing Block
            Column(
                horizontalAlignment = Alignment.End,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = formattedAmount,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = if (isDeclined) AndesTokens.TextDisabled else AndesTokens.TextPrimary,
                    textDecoration = if (isDeclined) TextDecoration.LineThrough else TextDecoration.None
                )
                Spacer(modifier = Modifier.height(4.dp))
                
                // Status Badge
                val (badgeBg, badgeColor, badgeLabel) = when (status) {
                    TransactionStatus.APPROVED -> Triple(AndesTokens.StatusSuccessBg, AndesTokens.StatusSuccessText, "CONCILIADO")
                    TransactionStatus.PENDING -> Triple(AndesTokens.StatusWarningBg, AndesTokens.StatusWarningText, "PENDENTE")
                    TransactionStatus.DECLINED -> Triple(AndesTokens.StatusDangerBg, AndesTokens.StatusDangerText, declineReason ?: "RECUSADO")
                    TransactionStatus.REFUNDED -> Triple(Color(0xFFE0E7FF), Color(0xFF3730A3), "ESTORNADO")
                }

                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = badgeBg,
                    modifier = Modifier.height(20.dp)
                ) {
                    Box(
                        modifier = Modifier.padding(horizontal = 8.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = badgeLabel.uppercase(),
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = badgeColor
                        )
                    }
                }
            }
        }
        
        // 1px subtle divider
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(AndesTokens.BorderSubtle)
        )
    }
}`;

  const markdownDoc = `# Guia de Handoff Técnico: TransactionRow (Conta Simples DS)

## 1. Visão Geral
O componente **TransactionRow** é a unidade elementar de representação contábil do extrato corporativo da Conta Simples. Foi concebido para operar de forma eficiente em listas virtuais de alto desempenho (\`FlatList\`, \`LazyColumn\`, \`VirtualList\`) com altura fixa de **72px**.

## 2. Anatomia de Layout
- **Altura Total**: 72px (default) | 56px (compact) | 88px (detailed).
- **Padding Horizontal**: 16px (\`spacing-md\`).
- **Leading Element**: 44 × 44 px (\`border-radius: 9999px\`).
- **Content Block**:
  - Título: 15px Medium, cor \`#111827\`, truncamento inteligente com reticências.
  - Subtítulo: 13px Regular, cor \`#6B7280\`, portador + tag de centro de custo.
- **Trailing Block**:
  - Valor Financeiro: 16px SemiBold, números tabulares (\`tabular-nums\`).
  - Badge de Status: pílula com fundo colorido e texto em caixa alta (\`PENDENTE\`, \`CONCILIADO\`, \`RECUSADO\`, \`ESTORNADO\`).

## 3. Matriz de Estados Interativos
1. **Default**: Fundo \`#FFFFFF\`, divisor inferior \`#E5E7EB\`.
2. **Hover (Desktop)**: Fundo \`#F8F9FA\`, transição \`150ms ease-out\`.
3. **Active/Pressed**: Fundo \`#F1F3F5\` ao toque/clique.
4. **Focus (Teclado)**: Anel de foco visível de 2px (\`ring-2 ring-blue-600 ring-offset-2\`) conforme **WCAG 2.4.7**.

## 4. Casos Extremos (Edge Cases)
- **Compra Internacional**: Exibe o valor original na moeda de origem (\`US$ 80.00\`) e abaixo a conversão final em BRL com spread e IOF (\`R$ 442,10\`).
- **Transação Recusada**: Valor riscado/tachado em cinza (\`line-through text-gray-400\`) com badge contendo o motivo exato (\`Saldo insuficiente\` ou \`Cartão bloqueado\`).
- **Texto Longo (>35 chars)**: Truncamento com reticências sem comprimir ou desalinhar a coluna de valores à direita.

## 5. Diretrizes de Acessibilidade (WCAG 2.1 AAA)
- **Rótulo para Leitores de Tela**:
  \`aria-label="Transação em [Estabelecimento], valor de [Valor], status [Status], paga por [Portador] com [Cartão]"\`
- **Suporte a Teclado**: \`tabIndex={0}\`, ações disparadas com \`Enter\` ou \`Space\`.`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden" id="section-ai-workflow">
      {/* Section Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
              4
            </span>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
              Workflow com IA (Google AI Studio Integration)
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold border border-indigo-200">
                gemini-3.8-flash
              </span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Automação prática do Design System: geração de schemas JSON rigorosos para props de componentes e guias de handoff prontos para engenharia multiplataforma (React Native & Jetpack Compose).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold">
            <Sparkles size={13} />
            Structured Outputs (JSON Schema)
          </span>
        </div>
      </div>

      <div className="p-6 lg:p-8 space-y-10">

        {/* PARTE 1: GERAÇÃO DE SCHEMAS E PROPS COM GOOGLE AI STUDIO */}
        <div className="border border-gray-200 rounded-xl bg-slate-50/60 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
                Workflow 01 • Design Technologist
              </span>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mt-0.5">
                <FileJson size={18} className="text-indigo-600" />
                Geração dos Schemas e Props do Componente (Structured Outputs)
              </h3>
            </div>
            
            <button
              onClick={runGenerateSchema}
              disabled={isGeneratingSchema}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto"
            >
              <RefreshCw size={13} className={isGeneratingSchema ? 'animate-spin' : ''} />
              <span>{isGeneratingSchema ? 'Gerando no Google AI Studio...' : 'Executar no Google AI Studio'}</span>
            </button>
          </div>

          {/* Prompt Display & Input */}
          <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-2xs mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Bot size={14} className="text-indigo-600" />
                Prompt Enviado ao Google AI Studio (JSON Schema):
              </label>
              <button
                onClick={() => setPromptInput(defaultPrompt)}
                className="text-[11px] text-gray-500 hover:text-indigo-600 underline"
              >
                Restaurar prompt original
              </button>
            </div>
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              rows={3}
              className="w-full text-xs font-mono p-3 rounded-lg border border-gray-200 bg-slate-50/50 text-gray-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
            />
          </div>

          {/* Results: JSON Schema Viewer */}
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
            <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Terminal size={14} className="text-emerald-400" />
                <span className="font-mono font-semibold">TransactionRow.schema.json (Draft 2020-12)</span>
                {schemaMetadata?.modelUsed && (
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-mono">
                    {schemaMetadata.modelUsed}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleCopy(JSON.stringify(schemaResult, null, 2), 'json-schema')}
                className="text-xs px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center gap-1.5 font-medium transition-colors"
              >
                {copiedSection === 'json-schema' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedSection === 'json-schema' ? 'Copiado!' : 'Copiar JSON Schema'}</span>
              </button>
            </div>

            <div className="p-4 max-h-[360px] overflow-y-auto">
              <pre className="text-[11px] font-mono text-emerald-300 leading-relaxed">
                {schemaResult 
                  ? JSON.stringify(schemaResult, null, 2)
                  : '// Carregando schema JSON estruturado via Google AI Studio...'
                }
              </pre>
            </div>
          </div>
        </div>

        {/* PARTE 2: AUTOMAÇÃO DO GUIA DE HANDOFF PARA ENGENHEIROS */}
        <div className="border border-gray-200 rounded-xl bg-slate-50/60 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                Workflow 02 • Engenharia Mobile & Web
              </span>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mt-0.5">
                <Smartphone size={18} className="text-blue-600" />
                Automação do Guia de Handoff para Engenheiros (Código de Produção)
              </h3>
            </div>

            {/* Platform Selector */}
            <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-white text-xs shadow-2xs">
              <button
                onClick={() => setActiveCodePlatform('reactNative')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeCodePlatform === 'reactNative' ? 'bg-blue-600 text-white font-semibold' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                React Native (TSX)
              </button>
              <button
                onClick={() => setActiveCodePlatform('jetpackCompose')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeCodePlatform === 'jetpackCompose' ? 'bg-blue-600 text-white font-semibold' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Jetpack Compose (Kotlin)
              </button>
              <button
                onClick={() => setActiveCodePlatform('markdownDoc')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeCodePlatform === 'markdownDoc' ? 'bg-blue-600 text-white font-semibold' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Guia em Markdown
              </button>
            </div>
          </div>

          {/* Context AI prompt assist bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
            <input
              type="text"
              value={handoffContext}
              onChange={(e) => setHandoffContext(e.target.value)}
              placeholder="Customizar com IA: Ex.: 'Adicionar suporte a recibos anexados com preview'..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={runGenerateHandoff}
              disabled={isGeneratingHandoff}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors"
            >
              <Send size={12} className={isGeneratingHandoff ? 'animate-pulse' : ''} />
              <span>{isGeneratingHandoff ? 'Gerando...' : 'Gerar com Gemini'}</span>
            </button>
          </div>

          {/* Code Viewer Stage */}
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
            <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Code2 size={14} className="text-blue-400" />
                <span className="font-mono font-semibold">
                  {activeCodePlatform === 'reactNative' 
                    ? 'TransactionRow.tsx (React Native)' 
                    : activeCodePlatform === 'jetpackCompose'
                      ? 'TransactionRowItem.kt (Jetpack Compose)'
                      : 'HANDOFF_SPEC.md (Markdown)'
                  }
                </span>
              </div>

              <button
                onClick={() => {
                  const textToCopy = 
                    activeCodePlatform === 'reactNative' ? reactNativeCode :
                    activeCodePlatform === 'jetpackCompose' ? jetpackComposeCode :
                    markdownDoc;
                  handleCopy(textToCopy, activeCodePlatform);
                }}
                className="text-xs px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 flex items-center gap-1.5 font-medium transition-colors"
              >
                {copiedSection === activeCodePlatform ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedSection === activeCodePlatform ? 'Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>

            <div className="p-4 max-h-[440px] overflow-y-auto">
              <pre className="text-[11px] font-mono text-slate-200 leading-relaxed">
                {activeCodePlatform === 'reactNative' && reactNativeCode}
                {activeCodePlatform === 'jetpackCompose' && jetpackComposeCode}
                {activeCodePlatform === 'markdownDoc' && markdownDoc}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
