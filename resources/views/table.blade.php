<table class="table-elt">
            @foreach ($notes as $note)
                <tr class="tr-table">
                    <td class="inner-table-0"># {{ $note->id }}</td>
                    <td class="inner-table-1">{{ $note->title }}</td>
                    <td class="inner-table-2 action-elt" type="button"  data-id="{{$note->id}}" onclick="add(id={{$note->id}})">show</td>
                    <td class="inner-table-3 action-elt">edit</td>
                    <td class="inner-table-4 action-elt">delete</td>
                
                </tr>
                
            @endforeach
</table>