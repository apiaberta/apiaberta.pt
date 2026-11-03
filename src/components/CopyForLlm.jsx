import { useState } from 'react'
import { Copy, Check, FileText } from 'lucide-react'
import { buildSkillMarkdown } from '../lib/llmSkill.js'

export default function CopyForLlm({ compact = false }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const skill = buildSkillMarkdown()
    try {
      await navigator.clipboard.writeText(skill)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = skill
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copiar skill SKILL.md para a área de transferência"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: copied ? '#16A34A' : '#0F172A',
        color: 'white',
        border: '1px solid ' + (copied ? '#16A34A' : '#334155'),
        borderRadius: '0.5rem',
        padding: compact ? '0.45rem 0.85rem' : '0.6rem 1.1rem',
        fontSize: compact ? '0.8rem' : '0.875rem',
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 0.15s',
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Skill copiada' : 'Copiar para LLM'}
      {!compact && !copied && <FileText size={14} style={{ opacity: 0.7 }} />}
    </button>
  )
}
