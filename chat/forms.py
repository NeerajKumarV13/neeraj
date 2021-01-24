from django import forms


class LinkForm(forms.Form):
    From = forms.CharField(max_length=30, widget=forms.TextInput(
        attrs={'class': 'form-control'}))
    To = forms.CharField(max_length=30, widget=forms.TextInput(
        attrs={'class': 'form-control'}))
