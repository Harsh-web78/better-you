import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { savePhotoBlob, deletePhotoBlob, compressImage } from '../utils/photoStore'
import { dateKey } from '../utils/date'

export const CHECKPOINT_WEEKS = [1, 2, 4, 8, 12]
const ANGLES = ['front', 'side', 'back']

// Checkpoint records (weight + photo ids) live in localStorage; the photo
// bytes themselves live in IndexedDB (see photoStore.js) and are referenced
// by id, e.g. "w4-front".
export function useTransformation() {
  const [checkpoints, setCheckpoints] = useLocalStorage('betterYou:transformation', {})
  const [, setWeightLog] = useLocalStorage('betterYou:weightLog', [])

  const upsertWeight = useCallback((date, kg) => {
    setWeightLog((prev) => [...prev.filter((e) => e.date !== date), { date, kg }])
  }, [setWeightLog])

  // photos: { front?: File, side?: File, back?: File }. Any field can be
  // omitted to leave that part of the checkpoint untouched.
  const saveCheckpoint = useCallback(async (week, { weight, photos } = {}) => {
    const prevEntry = checkpoints[week] ?? {}
    const entry = { ...prevEntry }

    if (weight !== undefined && weight !== null && weight !== '') {
      const kg = Number(weight)
      entry.weight = kg
      entry.loggedDate = entry.loggedDate ?? dateKey()
      upsertWeight(entry.loggedDate, kg)
    } else if (!entry.loggedDate) {
      entry.loggedDate = dateKey()
    }

    for (const angle of ANGLES) {
      const file = photos?.[angle]
      if (!file) continue
      const blob = await compressImage(file)
      const id = `w${week}-${angle}`
      await savePhotoBlob(id, blob)
      entry[`${angle}PhotoId`] = id
    }

    setCheckpoints((prev) => ({ ...prev, [week]: entry }))
  }, [checkpoints, setCheckpoints, upsertWeight])

  const deleteCheckpointPhoto = useCallback(async (week, angle) => {
    const id = checkpoints[week]?.[`${angle}PhotoId`]
    if (id) await deletePhotoBlob(id)
    setCheckpoints((prev) => {
      const entry = { ...(prev[week] ?? {}) }
      delete entry[`${angle}PhotoId`]
      return { ...prev, [week]: entry }
    })
  }, [checkpoints, setCheckpoints])

  return { checkpoints, saveCheckpoint, deleteCheckpointPhoto }
}
