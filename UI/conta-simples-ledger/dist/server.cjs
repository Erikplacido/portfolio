var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var genAI = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!genAI) {
    genAI = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return genAI;
}
var DEFAULT_TRANSACTION_ROW_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "TransactionRowProps",
  description: "Propriedades e contrato de interface para o componente TransactionRow do Design System Conta Simples (padr\xE3o Andes).",
  type: "object",
  required: [
    "id",
    "merchantName",
    "cardholderName",
    "costCenter",
    "amount",
    "currency",
    "status",
    "isInternational",
    "accessibilityLabel"
  ],
  properties: {
    id: {
      type: "string",
      description: "Identificador \xFAnico da transa\xE7\xE3o banc\xE1ria (ex: tx_9847291a)."
    },
    variant: {
      type: "string",
      enum: ["default", "compact", "detailed"],
      default: "default",
      description: "Variante visual do item de extrato. 'default' (72px com subt\xEDtulo e badge), 'compact' (56px para extratos densos em modais), 'detailed' (88px com convers\xE3o cambial e notas)."
    },
    status: {
      type: "string",
      enum: ["pending", "approved", "declined", "refunded"],
      description: "Estado do ciclo de vida da transa\xE7\xE3o corporativa: 'pending' (pendente), 'approved' (conciliado/aprovado), 'declined' (recusado), 'refunded' (estornado)."
    },
    merchantName: {
      type: "string",
      minLength: 1,
      maxLength: 120,
      description: "Nome fantasia do estabelecimento comercial ou raz\xE3o social."
    },
    cardholderName: {
      type: "string",
      description: "Nome completo do portador do cart\xE3o corporativo respons\xE1vel pela despesa."
    },
    cardLastDigits: {
      type: "string",
      pattern: "^[0-9]{4}$",
      description: "\xDAltimos 4 d\xEDgitos do cart\xE3o corporativo (f\xEDsico ou virtual)."
    },
    costCenter: {
      type: "object",
      required: ["code", "name"],
      properties: {
        code: { type: "string", description: "C\xF3digo cont\xE1bil (ex: CC-302)" },
        name: { type: "string", description: "Nome do centro de custo (ex: Engenharia, Marketing)" },
        tagColor: { type: "string", description: "Token de cor da tag Andes" }
      }
    },
    amount: {
      type: "number",
      description: "Valor num\xE9rico na moeda base da conta (BRL). Negativo para d\xE9bitos corporativos, positivo para estornos/cr\xE9ditos."
    },
    currency: {
      type: "string",
      enum: ["BRL", "USD"],
      default: "BRL",
      description: "C\xF3digo ISO 4217 da moeda da cobran\xE7a."
    },
    isInternational: {
      type: "boolean",
      default: false,
      description: "Sinalizador booleano indicando se a transa\xE7\xE3o foi originada no exterior com convers\xE3o de moeda estrangeira."
    },
    foreignExchange: {
      type: "object",
      description: "Metadados cambiais obrigat\xF3rios caso isInternational seja true.",
      properties: {
        originalAmount: { type: "number", description: "Valor original na moeda estrangeira (ex: 80.00)" },
        originalCurrency: { type: "string", enum: ["USD", "EUR", "GBP"], default: "USD" },
        exchangeRate: { type: "number", description: "Taxa de cota\xE7\xE3o comercial aplicada (ex: 5.20)" },
        iofAmount: { type: "number", description: "Imposto sobre Opera\xE7\xF5es Financeiras (ex: 4.38%)" },
        spreadPercentage: { type: "number", description: "Spread banc\xE1rio da fintech" }
      }
    },
    declineReason: {
      type: "string",
      enum: ["Saldo insuficiente", "Cart\xE3o bloqueado", "Limite corporativo excedido", "Suspeita de fraude"],
      description: "Motivo padronizado exibido no badge e tooltip quando status for 'declined'."
    },
    categoryIcon: {
      type: "string",
      enum: ["cloud_software", "fuel_transport", "food_meal", "travel_hotel", "office_supplies", "general"],
      default: "general",
      description: "Identificador de \xEDcone ou categoria para o Leading Element (44x44px)."
    },
    accessibilityLabel: {
      type: "string",
      description: "Texto estruturado linear para leitores de tela: 'Transa\xE7\xE3o em [Estabelecimento], valor de [Valor formatado], status [Status], paga por [Portador] com [Cart\xE3o]'."
    },
    keyboardFocusable: {
      type: "boolean",
      default: true,
      description: "Habilita tabIndex={0} e anel de foco vis\xEDvel de 2px para conformidade WCAG 2.4.7."
    },
    onClick: {
      type: "string",
      description: "Callback disparado ao clicar ou pressionar Enter/Space para abrir a gaveta de concilia\xE7\xE3o."
    }
  }
};
var DEFAULT_HANDOFF_DOCS = {
  reactNative: `/**
 * Conta Simples Design System (Andes Pattern)
 * Componente: TransactionRow (Mobile / React Native)
 * Acessibilidade: WCAG 2.1 AAA | VoiceOver & TalkBack
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, AccessibilityInfo } from 'react-native';

// Design Tokens (Andes Pattern)
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
  focusRing: '#2563EB',
  spacingXs: 4,
  spacingSm: 8,
  spacingMd: 16,
  radiusCard: 8,
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
    originalCurrency: string;
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
      accessibilityHint="Toque duas vezes para abrir os detalhes e anexar comprovante fiscal"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      {/* 1. Leading Element (44x44px) */}
      <View style={styles.leadingContainer}>
        <Text style={styles.leadingInitial}>
          {merchantName.substring(0, 2).toUpperCase()}
        </Text>
      </View>

      {/* 2. Content Block */}
      <View style={styles.contentBlock}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.merchantTitle}
        >
          {merchantName}
        </Text>
        <Text numberOfLines={1} style={styles.subTitle}>
          {cardholderName} \u2022 <Text style={styles.costCenterBadge}>{costCenter.name}</Text>
        </Text>
        {isInternational && foreignExchange && (
          <Text style={styles.fxNote}>
            USD {foreignExchange.originalAmount.toFixed(2)} \u2022 C\xE2mbio R$ {foreignExchange.exchangeRate.toFixed(2)} + IOF
          </Text>
        )}
      </View>

      {/* 3. Trailing Block */}
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
  leadingInitial: {
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
  costCenterBadge: {
    fontWeight: '600',
    color: '#3B82F6',
  },
  fxNote: {
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
});`,
  jetpackCompose: `/**
 * Conta Simples Design System (Andes Pattern)
 * Component: TransactionRowItem (Android / Jetpack Compose)
 * Standards: Material 3, Accessible TalkBack Semantics
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

// Andes Design System Color Tokens
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

            // 2. Content Block (Left text column)
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
                    text = "$cardholderName \u2022 $costCenterTag",
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

            // 3. Trailing Block (Right financial data)
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
        // Border subtle 1px at bottom
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(1.dp)
                .background(AndesTokens.BorderSubtle)
        )
    }
}`
};
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Conta Simples TransactionLedger & AI Workflow",
    geminiConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  });
});
app.post("/api/ai/generate-schema", async (req, res) => {
  const { customPrompt } = req.body;
  const client = getGeminiClient();
  const userPrompt = customPrompt || `Atue como Design Technologist. Crie um schema JSON detalhado para as propriedades (props) de um componente de linha de extrato banc\xE1rio de fintech chamado TransactionRow. O schema deve cobrir: variant (default, compact, detailed), status (pending, approved, declined, refunded), currency (BRL, USD), boolean para isInternational e estrutura de r\xF3tulos para leitores de tela (accessibilityLabel).`;
  if (!client) {
    return res.json({
      success: true,
      isFallback: true,
      modelUsed: "gemini-3.8-flash (pre-compiled spec)",
      prompt: userPrompt,
      schema: DEFAULT_TRANSACTION_ROW_SCHEMA,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  try {
    const response = await client.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Voc\xEA \xE9 um Design Technologist s\xEAnior especialista em Design Systems de Fintechs (padr\xE3o Andes do Mercado Livre / Conta Simples). Retorne estritamente um JSON Schema v\xE1lido (draft 2020-12) especificando todas as props requeridas e opcionais, tipos, enums, descri\xE7\xF5es detalhadas em portugu\xEAs e acessibilidade."
      }
    });
    const text = response.text || "";
    let parsedSchema = null;
    try {
      parsedSchema = JSON.parse(text);
    } catch {
      parsedSchema = DEFAULT_TRANSACTION_ROW_SCHEMA;
    }
    return res.json({
      success: true,
      isFallback: false,
      modelUsed: "gemini-3.8-flash",
      prompt: userPrompt,
      schema: parsedSchema,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    console.error("Error generating schema via Gemini:", error?.message || error);
    return res.json({
      success: true,
      isFallback: true,
      fallbackReason: error?.message || "API call failed, fallback loaded",
      modelUsed: "gemini-3.8-flash (spec fallback)",
      prompt: userPrompt,
      schema: DEFAULT_TRANSACTION_ROW_SCHEMA,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
});
app.post("/api/ai/generate-handoff", async (req, res) => {
  const { platform = "both", context } = req.body;
  const client = getGeminiClient();
  if (!client) {
    return res.json({
      success: true,
      isFallback: true,
      reactNative: DEFAULT_HANDOFF_DOCS.reactNative,
      jetpackCompose: DEFAULT_HANDOFF_DOCS.jetpackCompose,
      guidelines: `### Diretrizes de Implementa\xE7\xE3o T\xE9cnica (Andes Pattern - Conta Simples)
1. **Altura Fixa & Alinhamento**: O Container Principal possui sempre 72px de altura no estado \`default\` para garantir ritmo vertical de 8px e scroll com performance \xF3tima em FlatList / LazyColumn.
2. **Leading Element**: \xCDcone ou avatar de 44x44px centralizado verticalmente com margem direita de 16px.
3. **Trailing Block Tabular**: O valor deve obrigatoriamente utilizar fontes tabulares (\`tabular-nums\` / monospace numerals) para que casas decimais e centavos permane\xE7am perfeitamente alinhados verticalmente ao rolar o extrato.
4. **WCAG 2.1 AAA Contrast**: Texto principal com 14.2:1 em fundo branco. R\xF3tulo acess\xEDvel concatenado lido fluidamente por VoiceOver e TalkBack.`
    });
  }
  try {
    const prompt = `Atue como Design Technologist e Staff Mobile Engineer. Gere a documenta\xE7\xE3o t\xE9cnica de handoff e c\xF3digo de produ\xE7\xE3o em React Native (TypeScript) e Jetpack Compose (Kotlin) para o componente TransactionRow da Conta Simples.
Inclua:
- Implementa\xE7\xE3o completa com tokens Andes
- Tratamento de estados: Default, Pressed/Hover, Focus acess\xEDvel
- Edge cases: Compra internacional com cota\xE7\xE3o e IOF, Transa\xE7\xE3o recusada com valor tachado e motivo, Truncamento de texto longo (>35 chars) mantendo trailing block alinhado
- Sem\xE2ntica e acessibilidade (TalkBack & VoiceOver).
${context ? `Contexto adicional: ${context}` : ""}`;
    const response = await client.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "Voc\xEA \xE9 um Staff Engineer e Design Technologist especialista em Design Systems e acessibilidade m\xF3vel (Andes). Responda com c\xF3digo limpo, tipado e pronto para produ\xE7\xE3o."
      }
    });
    const generatedMarkdown = response.text || "";
    return res.json({
      success: true,
      isFallback: false,
      generatedMarkdown,
      reactNative: DEFAULT_HANDOFF_DOCS.reactNative,
      jetpackCompose: DEFAULT_HANDOFF_DOCS.jetpackCompose
    });
  } catch (err) {
    console.error("Error in generate-handoff:", err?.message || err);
    return res.json({
      success: true,
      isFallback: true,
      reactNative: DEFAULT_HANDOFF_DOCS.reactNative,
      jetpackCompose: DEFAULT_HANDOFF_DOCS.jetpackCompose
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
