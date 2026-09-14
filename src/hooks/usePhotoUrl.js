import { useEffect, useState } from 'react'
import { getPhotoBlob } from '../utils/photoStore'

// Loads a stored photo Blob by id and exposes it as an object URL for an
// <img>. Revokes the URL on cleanup so we don't leak memory as the user
// browses between checkpoints.
export function usePhotoUrl(id) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    let objectUrl = null
    let cancelled = false

    if (!id) {
      setUrl(null)
      return undefined
    }

    getPhotoBlob(id)
      .then((blob) => {
        if (cancelled) return
        if (blob) {
          objectUrl = URL.createObjectURL(blob)
          setUrl(objectUrl)
        } else {
          setUrl(null)
        }
      })
      .catch(() => {
        if (!cancelled) setUrl(null)
      })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [id])

  return url
}
