# Wrapper class for DNS actions

class ZoneController(object):

    def __init__(self, zone):
        """Initialize zone controller given a zone"""

        self.zone = zone

    def list_records(self):
        """Wrapper for the DNS cloud controller list_records() functionality"""
        return self.zone.cloud.ctl.dns.list_records(self.zone)

    def delete_zone(self):
        """Wrapper for the DNS cloud controller delete_zone() functionality"""
        return self.zone.cloud.ctl.dns.delete_zone(self.zone)

    def create_record(self, kwargs):
        """Wrapper for the DNS cloud controller create_record() functionality
        """
        kwargs['zone'] = self.zone
        return self.zone.cloud.ctl.dns.create_record(kwargs)


class RecordController(object):

    def __init__(self, record):
        """Initialize record controller given a record"""

        self.record = record

    def delete_record(self):
        return self.record.zone.cloud.ctl.dns.delete_record(
            self.record.zone, self.record)
