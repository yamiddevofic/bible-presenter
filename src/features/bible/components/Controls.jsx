import React from "react";
import Card from "../../../components/ui/Card";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Spinner from "../../../components/ui/Spinner";

export default function Controls({
  langFilter, setLangFilter,
  bibles, bibleId, setBibleId,
  books, bookId, setBookId,
  chapters, chapterId, setChapterId,
  search: { query, setQuery, searching, doSearch }
}) {
  return (
    <Card className="p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Select label="Idioma" value={langFilter} onChange={(e) => setLangFilter(e.target.value)}>
          <option value="spa">Español</option>
          <option value="eng">Inglés</option>
          <option value="por">Portugués</option>
          <option value="all">Todos</option>
        </Select>

        <Select label="Versión" value={bibleId} onChange={(e) => setBibleId(e.target.value)}>
          <option value="" disabled>Selecciona versión...</option>
          {bibles.map(b => (
            <option key={b.id} value={b.id}>{b.name} ({b.abbreviationLocal || b.abbreviation})</option>
          ))}
        </Select>

        <Select label="Libro" value={bookId} onChange={(e) => setBookId(e.target.value)} disabled={!bibleId}>
          <option value="" disabled>Selecciona libro...</option>
          {books.map(bk => (<option key={bk.id} value={bk.id}>{bk.name}</option>))}
        </Select>

        <Select label="Capítulo" value={chapterId} onChange={(e) => setChapterId(e.target.value)} disabled={!bookId}>
          <option value="" disabled>Selecciona capítulo...</option>
          {chapters.map(ch => (<option key={ch.id} value={ch.id}>{ch.number || ch.reference}</option>))}
        </Select>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Buscar versículos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && doSearch(e)}
        />
        <Button onClick={doSearch} disabled={searching}>
          {searching ? <Spinner /> : "Buscar"}
        </Button>
      </div>
    </Card>
  );
}
