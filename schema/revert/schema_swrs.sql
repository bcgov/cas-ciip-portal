-- Revert ggircs-portal:schema_swrs from pg

begin;

do $$
begin
raise notice 'swrs schema is not dropped as it may contain objects which are not managed by this sqitch project';
end$$;

commit;
