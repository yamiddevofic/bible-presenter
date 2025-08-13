import React from "react";
import Card from "../../../components/ui/Card";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Spinner from "../../../components/ui/Spinner";
import { Search } from "lucide-react";

export default function Controls({
  bibles, bibleId, setBibleId,
  books, bookId, setBookId,
  search: { query, setQuery, searching, doSearch },
  theme = "light"
}) {
  return (
    <Card className="p-6 mb-6" theme={theme}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select label="Versión" value={bibleId} onChange={(e) => setBibleId(e.target.value)} theme={theme}>
          <option value="" disabled>Selecciona versión...</option>
          {bibles.map(b => (
            <option key={b.id} value={b.id}>{b.name} ({b.abbreviationLocal || b.abbreviation})</option>
          ))}
        </Select>

        <Select label="Libro" value={bookId} onChange={(e) => setBookId(e.target.value)} disabled={!bibleId} theme={theme}>
          <option value="" disabled>Selecciona libro...</option>
          {books.map(bk => (<option key={bk.id} value={bk.id}>{bk.name}</option>))}
        </Select>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Buscar versículos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && doSearch(e)}
          theme={theme}
        />
        <Button onClick={doSearch} disabled={searching} theme={theme} className="flex items-center gap-2 cursor-pointer">
          {searching ? (
            <Spinner />
          ) : (
            <>
              <Search className="w-4 h-4 mr-1" />
              Buscar
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
