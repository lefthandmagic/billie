'use client';
import { useState } from 'react';
import { Patient } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PatientForm } from './PatientForm';
import { formatDate } from '@/lib/utils';

interface PatientListProps {
  patients: Patient[];
  onUpdate: (patient: Patient) => void;
  onDelete: (id: string) => void;
  onAdd: (patient: Patient) => void;
}

export function PatientList({ patients, onUpdate, onDelete, onAdd }: PatientListProps) {
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Patients</h2>
          <p className="text-sm text-slate-500">{patients.length} patient{patients.length !== 1 ? 's' : ''} saved</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          + Add Patient
        </Button>
      </div>

      {patients.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
          <div className="text-3xl mb-3">👤</div>
          <p className="text-slate-600 font-medium">No patients yet</p>
          <p className="text-slate-400 text-sm mt-1">Add your first patient to get started</p>
          <Button className="mt-4" onClick={() => setShowAddModal(true)}>
            Add Patient
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-sm font-medium text-slate-900">{patient.fullName}</p>
                <p className="text-xs text-slate-500">
                  DOB: {formatDate(patient.dateOfBirth)} · {patient.insurancePayer} · ID: {patient.memberId}
                </p>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <Button size="sm" variant="ghost" onClick={() => setEditingPatient(patient)}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(patient.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Patient" size="lg">
        <PatientForm
          onSave={(p) => { onAdd(p); setShowAddModal(false); }}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      <Modal open={!!editingPatient} onClose={() => setEditingPatient(null)} title="Edit Patient" size="lg">
        <PatientForm
          initial={editingPatient}
          onSave={(p) => { onUpdate(p); setEditingPatient(null); }}
          onCancel={() => setEditingPatient(null)}
        />
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Patient" size="sm">
        <p className="text-slate-600 text-sm mb-6">
          Are you sure you want to remove this patient? This cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => { onDelete(deleteConfirm!); setDeleteConfirm(null); }}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
