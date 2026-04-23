'use client';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Patient, ProviderProfile, Session } from '@/lib/types';
import { CPT_CODES, ICD10_CODES, PLACE_OF_SERVICE } from '@/lib/constants';

const colors = {
  teal: '#0d9488',
  tealLight: '#f0fdfa',
  slate900: '#0f172a',
  slate700: '#334155',
  slate500: '#64748b',
  slate300: '#cbd5e1',
  slate100: '#f1f5f9',
  white: '#ffffff',
};

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9, color: colors.slate900, padding: 36, backgroundColor: colors.white },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, paddingBottom: 16, borderBottom: `2px solid ${colors.teal}` },
  headerLeft: { flex: 1 },
  title: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: colors.teal, marginBottom: 2 },
  subtitle: { fontSize: 9, color: colors.slate500, letterSpacing: 1 },
  headerRight: { alignItems: 'flex-end' },
  statementLabel: { fontSize: 8, color: colors.slate500, marginBottom: 2 },
  statementDate: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: colors.slate900 },
  twoCol: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  card: { flex: 1, backgroundColor: colors.slate100, borderRadius: 6, padding: 12 },
  cardTitle: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: colors.slate500, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  cardRow: { flexDirection: 'row', marginBottom: 3 },
  cardLabel: { fontSize: 8, color: colors.slate500, width: 70 },
  cardValue: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: colors.slate900, flex: 1 },
  cardValueNormal: { fontSize: 8, color: colors.slate900, flex: 1 },
  tableTitle: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: colors.slate500, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  tableHeader: { flexDirection: 'row', backgroundColor: colors.teal, borderRadius: 4, padding: '6 8', marginBottom: 2 },
  tableHeaderCell: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: colors.white },
  tableRow: { flexDirection: 'row', padding: '5 8', borderBottom: `1px solid ${colors.slate100}` },
  tableRowAlt: { flexDirection: 'row', padding: '5 8', backgroundColor: colors.slate100, borderRadius: 2, marginBottom: 1 },
  tableCell: { fontSize: 8, color: colors.slate900 },
  tableCellMuted: { fontSize: 8, color: colors.slate500 },
  colDate: { width: '12%' },
  colPos: { width: '10%' },
  colCpt: { width: '26%' },
  colDx: { width: '22%' },
  colUnits: { width: '8%', textAlign: 'center' },
  colFee: { width: '11%', textAlign: 'right' },
  colTotal: { width: '11%', textAlign: 'right' },
  totalRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8, paddingTop: 8, borderTop: `1px solid ${colors.slate300}` },
  totalLabel: { fontSize: 9, color: colors.slate700, marginRight: 12 },
  totalAmount: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: colors.teal, minWidth: 60, textAlign: 'right' },
  footer: { marginTop: 20, paddingTop: 12, borderTop: `1px solid ${colors.slate300}` },
  footerText: { fontSize: 7, color: colors.slate500, lineHeight: 1.5, marginBottom: 4 },
  footerBranding: { fontSize: 7, color: colors.slate300, textAlign: 'right', marginTop: 8 },
  disclaimer: { backgroundColor: colors.tealLight, borderRadius: 4, padding: 8, marginBottom: 16 },
  disclaimerText: { fontSize: 7, color: colors.teal, lineHeight: 1.5 },
});

function formatDate(d: string): string {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return `${m}/${day}/${y}`;
}

function formatCurrency(n: number): string {
  return `$${n.toFixed(2)}`;
}

interface SuperbillDocumentProps {
  provider: ProviderProfile;
  patient: Patient;
  sessions: Session[];
  statementDate: string;
}

export function SuperbillDocument({ provider, patient, sessions, statementDate }: SuperbillDocumentProps) {
  const total = sessions.reduce((sum, s) => sum + (parseFloat(s.fee) || 0) * (parseFloat(s.units) || 1), 0);

  function getCptLabel(code: string) {
    return CPT_CODES.find((c) => c.code === code)?.description ?? code;
  }

  function getDxLabel(code: string) {
    return ICD10_CODES.find((c) => c.code === code)?.description ?? code;
  }

  function getPosLabel(code: string) {
    return PLACE_OF_SERVICE.find((p) => p.code === code)?.description ?? code;
  }

  const providerName = provider.practiceName
    ? `${provider.practiceName}\n${provider.fullName}, ${provider.credentials}`
    : `${provider.fullName}, ${provider.credentials}`;

  return (
    <Document title={`Superbill — ${patient.fullName} — ${statementDate}`}>
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.title}>Billie</Text>
            <Text style={s.subtitle}>SUPERBILL / STATEMENT OF SERVICES</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.statementLabel}>STATEMENT DATE</Text>
            <Text style={s.statementDate}>{formatDate(statementDate)}</Text>
          </View>
        </View>

        {/* Provider + Patient */}
        <View style={s.twoCol}>
          <View style={s.card}>
            <Text style={s.cardTitle}>Rendering Provider</Text>
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>Name</Text>
              <Text style={s.cardValue}>{provider.fullName}, {provider.credentials}</Text>
            </View>
            {provider.practiceName ? (
              <View style={s.cardRow}>
                <Text style={s.cardLabel}>Practice</Text>
                <Text style={s.cardValueNormal}>{provider.practiceName}</Text>
              </View>
            ) : null}
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>NPI</Text>
              <Text style={s.cardValueNormal}>{provider.npi}</Text>
            </View>
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>Tax ID</Text>
              <Text style={s.cardValueNormal}>{provider.taxId}</Text>
            </View>
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>License</Text>
              <Text style={s.cardValueNormal}>{provider.licenseNumber} ({provider.licenseState})</Text>
            </View>
            {provider.taxonomyCode ? (
              <View style={s.cardRow}>
                <Text style={s.cardLabel}>Taxonomy</Text>
                <Text style={s.cardValueNormal}>{provider.taxonomyCode}</Text>
              </View>
            ) : null}
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>Address</Text>
              <Text style={s.cardValueNormal}>{provider.address}{'\n'}{provider.city}, {provider.state} {provider.zip}</Text>
            </View>
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>Phone</Text>
              <Text style={s.cardValueNormal}>{provider.phone}</Text>
            </View>
          </View>

          <View style={s.card}>
            <Text style={s.cardTitle}>Patient</Text>
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>Name</Text>
              <Text style={s.cardValue}>{patient.fullName}</Text>
            </View>
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>Date of Birth</Text>
              <Text style={s.cardValueNormal}>{formatDate(patient.dateOfBirth)}</Text>
            </View>
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>Payer</Text>
              <Text style={s.cardValueNormal}>{patient.insurancePayer}</Text>
            </View>
            <View style={s.cardRow}>
              <Text style={s.cardLabel}>Member ID</Text>
              <Text style={s.cardValueNormal}>{patient.memberId}</Text>
            </View>
            {patient.groupNumber ? (
              <View style={s.cardRow}>
                <Text style={s.cardLabel}>Group #</Text>
                <Text style={s.cardValueNormal}>{patient.groupNumber}</Text>
              </View>
            ) : null}
            {patient.subscriberName ? (
              <>
                <View style={s.cardRow}>
                  <Text style={s.cardLabel}>Subscriber</Text>
                  <Text style={s.cardValueNormal}>{patient.subscriberName}</Text>
                </View>
                {patient.subscriberDob ? (
                  <View style={s.cardRow}>
                    <Text style={s.cardLabel}>Sub. DOB</Text>
                    <Text style={s.cardValueNormal}>{formatDate(patient.subscriberDob)}</Text>
                  </View>
                ) : null}
              </>
            ) : null}
          </View>
        </View>

        {/* Services Table */}
        <Text style={s.tableTitle}>Services Rendered</Text>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, s.colDate]}>Date</Text>
          <Text style={[s.tableHeaderCell, s.colPos]}>POS</Text>
          <Text style={[s.tableHeaderCell, s.colCpt]}>Procedure (CPT)</Text>
          <Text style={[s.tableHeaderCell, s.colDx]}>Diagnosis (ICD-10)</Text>
          <Text style={[s.tableHeaderCell, s.colUnits]}>Units</Text>
          <Text style={[s.tableHeaderCell, s.colFee]}>Fee</Text>
          <Text style={[s.tableHeaderCell, s.colTotal]}>Amount</Text>
        </View>

        {sessions.map((session, i) => {
          const rowTotal = (parseFloat(session.fee) || 0) * (parseFloat(session.units) || 1);
          const RowStyle = i % 2 === 0 ? s.tableRow : s.tableRowAlt;
          return (
            <View key={session.id} style={RowStyle}>
              <Text style={[s.tableCell, s.colDate]}>{formatDate(session.dateOfService)}</Text>
              <Text style={[s.tableCellMuted, s.colPos]}>{session.placeOfService}</Text>
              <Text style={[s.tableCell, s.colCpt]}>{session.cptCode}{'\n'}
                <Text style={s.tableCellMuted}>{getCptLabel(session.cptCode)}</Text>
              </Text>
              <Text style={[s.tableCell, s.colDx]}>{session.diagnosisCode}{'\n'}
                <Text style={s.tableCellMuted}>{getDxLabel(session.diagnosisCode)}</Text>
              </Text>
              <Text style={[s.tableCell, s.colUnits]}>{session.units}</Text>
              <Text style={[s.tableCell, s.colFee]}>{formatCurrency(parseFloat(session.fee) || 0)}</Text>
              <Text style={[s.tableCell, s.colTotal]}>{formatCurrency(rowTotal)}</Text>
            </View>
          );
        })}

        {/* Total */}
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>Total Charged:</Text>
          <Text style={s.totalAmount}>{formatCurrency(total)}</Text>
        </View>

        {/* Disclaimer */}
        <View style={[s.disclaimer, { marginTop: 16 }]}>
          <Text style={s.disclaimerText}>
            This is not a bill. This document is a superbill provided for insurance reimbursement purposes only.
            Please submit this document to your insurance carrier to request reimbursement for out-of-network services.
            This provider is not responsible for insurance reimbursement decisions or outcomes.
          </Text>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>
            Provider signature: __________________________________ Date: ____________
          </Text>
          <Text style={s.footerBranding}>Generated by Billie · billie.fyi</Text>
        </View>
      </Page>
    </Document>
  );
}
